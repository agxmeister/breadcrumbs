import * as fs from "node:fs/promises";
import * as path from "node:path";
import {inject, injectable} from "inversify";
import {dependencies} from "@/dependencies";

@injectable()
export class BreadcrumbRepository {
    constructor(
        @inject(dependencies.DATA_BASE_PATH) private readonly dataDir: string,
    ) {}

    private getFilePath(breadcrumbId: string): string {
        return path.join(
            this.dataDir,
            'breadcrumbs',
            breadcrumbId.substring(0, 2),
            breadcrumbId.substring(0, 4),
            `${breadcrumbId}.png`,
        );
    }

    async save(breadcrumbId: string, buffer: Buffer): Promise<void> {
        const filePath = this.getFilePath(breadcrumbId);
        const dirPath = path.dirname(filePath);
        await fs.mkdir(dirPath, { recursive: true });
        await fs.writeFile(filePath, buffer);
    }

    async delete(breadcrumbId: string): Promise<void> {
        const filePath = this.getFilePath(breadcrumbId);
        await fs.unlink(filePath);
    }

    async exists(breadcrumbId: string): Promise<boolean> {
        const filePath = this.getFilePath(breadcrumbId);
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }
}
