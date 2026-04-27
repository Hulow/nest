import { Module } from '@nestjs/common';
import { ProcessFileController } from './infra/ProcessFileController';
import { CommandHandler } from './application/CommandHandler';
import { DOCUMENT_LOADER } from './infra/DocumentLoader';
import { DocumentLoader } from './infra/DocumentLoader';
import { TEXT_SPLITTER, TextSplitter } from './infra/TextSplitter';
import { DOCUMENT_EMBEDDER, DocumentEmbedder } from './infra/DocumentEmbedder';
import { LoggerModule } from 'pino-nestjs';
import { OPENSEARCH_CLIENT, REPORT_REPOSITORY, ReportRepository } from './infra/ReportRepository';
import { Client } from '@opensearch-project/opensearch';

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
    },
    {
      provide: OPENSEARCH_CLIENT,
      useFactory: () => {
        return new Client({
          node: 'http://localhost:9200',
        });
      },
    },
    {
      provide: REPORT_REPOSITORY,
      useFactory: (client: Client) => {
        return new ReportRepository(client);
      },
      inject: [OPENSEARCH_CLIENT],
    }
  ],
})

export class AppModule {}
