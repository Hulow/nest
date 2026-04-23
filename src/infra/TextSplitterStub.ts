import { Document } from "src/domain/Document";
import { ITextSplitter } from "src/domain/ITextSplitter";

export class TextSplitterStub implements ITextSplitter {
    process(document: Document): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    
}