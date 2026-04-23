export class Command {
    private type: string;
    private fileName: string;
    private encodingType: string;
    private mimetype: string;
    private content: Buffer;
    private size: number;

    private constructor(
        type: string,
        fileName: string,
        encodingType: string,
        mimetype: string,
        file: Buffer,
        size: number
    ) {
        this.type = type;
        this.fileName = fileName;
        this.encodingType = encodingType;
        this.mimetype = mimetype;
        this.content = file;
        this.size = size
    }

    static from(
        type: string,
        fileName: string,
        encodingType: string,
        mimetype: string,
        content: Buffer,
        size: number
    ) : Command {
        return new Command(
            type,
            fileName,
            encodingType,
            mimetype,
            content,
            size
        )
    }

    getFileName(): string {
        return this.fileName
    }

    getContent(): Buffer {
        return this.content
    }

    getEncodingType(): string {
        return this.encodingType;
    }
}