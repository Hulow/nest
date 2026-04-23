import { Module } from '@nestjs/common';
import { ProcessFileController } from './infra/ProcessFileController';
import { CommandHandler } from './application/CommandHandler';
import { DOCUMENT_LOADER } from './infra/DocumentLoader';
import { DocumentLoader } from './infra/DocumentLoader';
import { TEXT_SPLITTER, TextSplitter } from './infra/TextSplitter';

@Module({
  imports: [],
  controllers: [ProcessFileController],
  providers: [
    CommandHandler,
    {
      provide: DOCUMENT_LOADER,
      useClass: DocumentLoader,
    },
    {
      provide: TEXT_SPLITTER,
      useClass: TextSplitter
    }
  ],
})

export class AppModule {}
