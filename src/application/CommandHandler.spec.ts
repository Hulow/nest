import { beforeAll, beforeEach, describe, expect, it } from "@jest/globals"
import { CommandHandler } from "./CommandHandler"
import { DocumentLoaderStub } from "../infra/DocumentLoaderStub"
import { Command } from "./Command"

describe('Given a Command to handle', () => {
    let handler: CommandHandler
    let documentLoader: DocumentLoaderStub

    const VALID_COMMAND = {
        type: 'type',
        fileName: 'fileName',
        encodingType: 'encodingType',
        mimetype: 'mimetype',
        content: Buffer.from('content'),
        size: 1,
    }

    const startDepandenciesToInject = () => {
        documentLoader = new DocumentLoaderStub()
    }

    const startHandler = () => {
        handler = new CommandHandler(documentLoader)
    }

    beforeAll(() => {
        startDepandenciesToInject();
        startHandler();
    })

    beforeEach(() => {
        documentLoader.clean();
    })

    describe('When the document is empty', () => {
        let command: Command;

        const startScenario = () => {
            command = Command.from(
                VALID_COMMAND.type,
                VALID_COMMAND.fileName,
                VALID_COMMAND.encodingType,
                VALID_COMMAND.mimetype,
                VALID_COMMAND.content,
                VALID_COMMAND.size
            )
        }

        beforeEach(() => {
            startScenario();
            documentLoader.emptyDoc();
        })

        it('Then throws a EmptyDocumentError', async () => {
            await expect(handler.process(command)).rejects.toThrow();
        })
    })
})