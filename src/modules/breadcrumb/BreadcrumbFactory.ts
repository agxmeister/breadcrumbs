import {v4} from "uuid";
import {Breadcrumb} from "./types";
import {BreadcrumbService} from "./BreadcrumbService";
import {BreadcrumbRepository} from "./BreadcrumbRepository";

export class BreadcrumbFactory {
    constructor(
        private readonly service: BreadcrumbService,
        private readonly repository: BreadcrumbRepository,
    ) {}

    async create(buffer: Buffer): Promise<Breadcrumb> {
        const id = v4();
        const filePath = this.service.getFilePath(id);

        await this.repository.save(filePath, buffer);

        return {
            id,
            url: this.service.getUrl(id),
            filePath,
        };
    }
}
