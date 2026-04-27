export abstract class IReportRepository {
    public abstract addDocument(document: number[]): Promise<void> 
}