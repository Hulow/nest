export abstract class IDocumentEmbedder {
    abstract process(texts: string[]): Promise<number[][]>
}