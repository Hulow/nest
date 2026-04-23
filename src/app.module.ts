import { Module } from '@nestjs/common';
import { ProcessFileController } from './infra/ProcessFileController';
import { CommandHandler, DOCUMENT_LOADER } from './application/CommandHandler';
import { DocumentLoader } from './infra/DocumentLoader';

@Module({
  imports: [],
  controllers: [ProcessFileController],
  providers: [
    CommandHandler,
    {
      provide: DOCUMENT_LOADER,
      useClass: DocumentLoader,
  },
  ],
})

export class AppModule {}
