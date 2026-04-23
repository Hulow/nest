export class Command {
    private type: string;
    private fileName: string;
    private encodingType: string;
    private mimetype: string;
    private file: Buffer;
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
        this.file = file;
        this.size = size
    }

    static from(
        type: string,
        fileName: string,
        encodingType: string,
        mimetype: string,
        file: Buffer,
        size: number
    ) : Command {
        return new Command(
            type,
            fileName,
            encodingType,
            mimetype,
            file,
            size
        )
    }

    getFileName(): string {
        return this.fileName
    }
}