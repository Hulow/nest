import { Module } from '@nestjs/common';
import { ProcessFileController } from './adapters/ProcessFileController';
import { CommandHandler } from './application/CommandHandler';

@Module({
  imports: [],
  controllers: [ProcessFileController],
  providers: [CommandHandler],
})

export class AppModule {}
