import { Controller, Post, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CommandHandler } from '../application/CommandHandler';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Command } from 'src/application/Command';


@Controller()
export class ProcessFileController {
  constructor(private readonly handler: CommandHandler) {}
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @Post('upload')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })

  upload(@UploadedFile() file: Express.Multer.File): Promise<void> {
    return this.handler.process(
      Command.from(
        file.fieldname,
        file.originalname,
        file.encoding,
        file.mimetype,
        file.buffer,
        file.size
      )
    );
  }
}
