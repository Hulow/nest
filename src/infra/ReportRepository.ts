import { IReportRepository } from "../domain/IReportRepository";

import { Client } from '@opensearch-project/opensearch'

export const REPORT_REPOSITORY = Symbol('REPORT_REPOSITORY');
export const OPENSEARCH_CLIENT = Symbol('OPENSEARCH_CLIENT');

export class ReportRepository implements IReportRepository {
    private client: Client

    constructor(client: Client) {
        this.client = client
    }
    async addDocument(document: number[]): Promise<void> {
        await this.client.index({
            index: 'report',
            body: document,
            refresh: true,
});
    }
}