import { Module } from '@nestjs/common';
import { ProcessFileController } from './infra/ProcessFileController';
import { CommandHandler } from './application/CommandHandler';
import { DOCUMENT_LOADER } from './infra/DocumentLoader';
import { DocumentLoader } from './infra/DocumentLoader';
import { TEXT_SPLITTER, TextSplitter } from './infra/TextSplitter';
import { DOCUMENT_EMBEDDER, DocumentEmbedder } from './infra/DocumentEmbedder';
import { LoggerModule } from 'pino-nestjs';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
  ],
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
    },
    {
      provide: DOCUMENT_EMBEDDER,
      useClass: DocumentEmbedder
    }
  ],
})

export class AppModule {}
