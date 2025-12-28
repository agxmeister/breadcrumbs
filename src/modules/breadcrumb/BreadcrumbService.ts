import * as path from "node:path";
import {inject, injectable} from "inversify";
import {dependencies} from "@/dependencies";
import {BreadcrumbRepository} from "./BreadcrumbRepository";

@injectable()
export class BreadcrumbService {
    constructor(
        @inject(dependencies.DATA_BASE_PATH) private readonly dataDir: string,
        @inject(dependencies.PUBLIC_URL) private readonly publicUrl: string,
        @inject(dependencies.BreadcrumbRepository) private readonly repository: BreadcrumbRepository,
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
