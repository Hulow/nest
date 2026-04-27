import { Inject, Injectable } from '@nestjs/common';

import { Command } from './Command';
import { DOCUMENT_LOADER, DocumentLoader } from '../infra/DocumentLoader';
import { TEXT_SPLITTER, TextSplitter } from '../infra/TextSplitter';
import { DOCUMENT_EMBEDDER, DocumentEmbedder } from '../infra/DocumentEmbedder';
import { Document } from '../domain/Document';
import { REPORT_REPOSITORY, ReportRepository } from '../infra/ReportRepository';

@Injectable()
export class CommandHandler {
  constructor(
    @Inject(DOCUMENT_LOADER)
    private documentLoader: DocumentLoader,
    @Inject(TEXT_SPLITTER) 
    private textSplitter: TextSplitter,
    @Inject(DOCUMENT_EMBEDDER)
    private documentEmbedder: DocumentEmbedder,
    @Inject(REPORT_REPOSITORY)
    private reportRepository: ReportRepository
  ) {}
  async process(command: Command): Promise<void> {

    const docs = await this.documentLoader.load(
      command.getContent(), 
      command.getEncodingType()
    );

    if(docs.length === 0) {
      throw new Error('EmptyDocumentError')
    }

    await Promise.all(
      docs.map(doc => this.processDocument(doc))
    )

    return;
  }

  private async processDocument(doc: Document): Promise<void> {
    const texts: string[] = await this.splitText(doc);
    const vectors = await this.vectorizeText(texts);
   
    for (const vector of vectors) {
       await this.storeReport(vector);
    }
  }

  private async splitText(doc: Document): Promise<string[]> {
    return await this.textSplitter.process(doc);
  }

  private async vectorizeText(texts: string[]): Promise<number[][]> {
    return await this.documentEmbedder.process(texts);
  }

  private async storeReport(document: number[]): Promise<void> {
    return await this.reportRepository.addDocument(document);
  }
}