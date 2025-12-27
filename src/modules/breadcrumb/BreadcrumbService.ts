import * as path from "node:path";
import {BreadcrumbRepository} from "./BreadcrumbRepository";

export class BreadcrumbService {
    constructor(
        private readonly dataDir: string,
        private readonly publicUrl: string,
        private readonly repository: BreadcrumbRepository,
    ) {}

    getFilePath(breadcrumbId: string): string {
        return path.join(
            this.dataDir,
            'breadcrumbs',
            breadcrumbId.substring(0, 2),
            breadcrumbId.substring(0, 4),
            `${breadcrumbId}.png`,
        );
    }

    getUrl(breadcrumbId: string): string {
        return `${this.publicUrl}/breadcrumbs/${breadcrumbId}`;
    }

    async delete(breadcrumbId: string): Promise<void> {
        const filePath = this.getFilePath(breadcrumbId);
        await this.repository.delete(filePath);
    }
}
