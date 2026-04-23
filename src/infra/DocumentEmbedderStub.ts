import { IDocumentEmbedder } from "../domain/IDocumentEmbedder";

export class DocumentEmbedderStub implements IDocumentEmbedder {
    process(texts: string[]): Promise<number[][]> {
        throw new Error("Method not implemented.");
    }
}