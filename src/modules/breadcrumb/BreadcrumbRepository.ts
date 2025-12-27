import * as fs from "node:fs/promises";
import * as path from "node:path";

export class BreadcrumbRepository {
    async save(filePath: string, buffer: Buffer): Promise<void> {
        const dirPath = path.dirname(filePath);
        await fs.mkdir(dirPath, { recursive: true });
        await fs.writeFile(filePath, buffer);
    }

    async delete(filePath: string): Promise<void> {
        await fs.unlink(filePath);
    }

    async exists(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }
}
