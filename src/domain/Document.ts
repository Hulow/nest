export class Document {
    private content: string 

    private constructor(content: string) {
        this.content = content
    }

    static from(content: string): Document {
        return new Document(content)
    }

    getContent(): string {
        return this.content
    }
}