import { Document } from "../domain/Document";
import { ITextSplitter } from "../domain/ITextSplitter";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const TEXT_SPLITTER = Symbol('TEXT_SPLITTER');

export class TextSplitter implements ITextSplitter {

    async process(document: Document): Promise<void> {
        const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 100, chunkOverlap: 0 })
        const text = await splitter.splitText(document.getContent())
        console.log(text);
    }

}