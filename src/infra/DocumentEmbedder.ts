import { IDocumentEmbedder } from "../domain/IDocumentEmbedder";
import { OllamaEmbeddings } from "@langchain/ollama";

export const DOCUMENT_EMBEDDER = Symbol('DOCUMENT_EMBEDDER');

export class DocumentEmbedder implements IDocumentEmbedder {
    async process(texts: string[]): Promise<number[][]> {
        const embeddings = new OllamaEmbeddings({
            model: "llama2",
            baseUrl: "http://localhost:11434",
        });

        return await embeddings.embedDocuments(texts);
    }
}