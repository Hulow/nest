import { Document } from "./Document";

export abstract class IDocumentLoader {
    public abstract load(content: Buffer, type: string): Promise<Document[]>
}