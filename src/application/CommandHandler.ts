import { Inject, Injectable } from '@nestjs/common';

import { Command } from './Command';
import { DOCUMENT_LOADER, DocumentLoader } from '../infra/DocumentLoader';
import { TEXT_SPLITTER, TextSplitter } from '../infra/TextSplitter';

@Injectable()
export class CommandHandler {
  constructor(
    @Inject(DOCUMENT_LOADER)
    private documentLoader: DocumentLoader,
    @Inject(TEXT_SPLITTER) 
    private textSplitter: TextSplitter,
  ) {}
  async process(command: Command): Promise<void> {

    const docs = await this.documentLoader.load(
      command.getContent(), 
      command.getEncodingType()
    );

    if(docs.length === 0) {
      throw new Error('EmptyDocumentError')
    }

    docs.map(async (doc) => await this.textSplitter.process(doc))

    return;
  }
}