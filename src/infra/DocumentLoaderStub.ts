import { IDocumentLoader } from "../domain/DocumentLoader";
import { Document } from "../domain/Document"


export class DocumentLoaderStub implements IDocumentLoader  {
    private documents: Document[] = [];
    private isEmptyDoc: boolean = false;
    public load(content: Buffer, type: string): Promise<Document[]> {
        const doc = Document.from('content')
        this.documents.push(doc)

        return Promise.resolve(this.isEmptyDoc ?
            [] : 
            [Document.from('content')]
        )
    }


    getDocuments(): Document[] {
        return this.documents
    }

    clean(): void {
        this.documents = []
    }

    emptyDoc() {
        this.isEmptyDoc = true;
    }

}