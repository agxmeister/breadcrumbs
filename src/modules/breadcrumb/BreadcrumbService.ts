import {inject, injectable} from "inversify";
import {dependencies} from "@/dependencies";
import {BreadcrumbRepository} from "./BreadcrumbRepository";

@injectable()
export class BreadcrumbService {
    constructor(
        @inject(dependencies.PUBLIC_URL) private readonly publicUrl: string,
        @inject(dependencies.BreadcrumbRepository) private readonly repository: BreadcrumbRepository,
    ) {}

    getUrl(breadcrumbId: string): string {
        return `${this.publicUrl}/breadcrumbs/${breadcrumbId}`;
    }

    async delete(breadcrumbId: string): Promise<void> {
        await this.repository.delete(breadcrumbId);
    }
}
