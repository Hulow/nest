import { Document } from "./Document";

export abstract class ITextSplitter {
    abstract process(document: Document): Promise<string[]>
}