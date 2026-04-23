import { Document } from "../domain/Document";
import { IDocumentLoader } from "src/domain/IDocumentLoader";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"

export class DocumentLoader implements IDocumentLoader {
    public async load(content: Buffer, type: string): Promise<Document[]> {
        const blob = new Blob(
            [
                new Uint8Array(content)
            ],
            { 
                type
            }
        );
        
        const loader = new PDFLoader(blob)
        const docs = await loader.load()

        return docs.map(doc => Document.from(doc.pageContent))
    }
}