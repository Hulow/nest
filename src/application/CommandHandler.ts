import { Injectable } from '@nestjs/common';

import { Command } from './Command';


@Injectable()
export class CommandHandler {
  process(command: Command): string {
    return command.getFileName();
  }
}