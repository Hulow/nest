import { Inject, Injectable } from '@nestjs/common';

import { Command } from './Command';
import { DocumentLoader } from '../infra/DocumentLoader';

export const DOCUMENT_LOADER = Symbol('DOCUMENT_LOADER');


@Injectable()
export class CommandHandler {
  constructor(
    @Inject(DOCUMENT_LOADER)
    private documentLoader: DocumentLoader
  ) {}
  async process(command: Command): Promise<void> {

    const docs = await this.documentLoader.load(
      command.getContent(), 
      command.getEncodingType()
    );

    if(docs.length === 0) {
      throw new Error('EmptyDocumentError')
    }

    return;
  }
}