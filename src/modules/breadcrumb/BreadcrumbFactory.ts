import {v4} from "uuid";
import {inject, injectable} from "inversify";
import {dependencies} from "@/dependencies";
import {Breadcrumb} from "./types";
import {BreadcrumbService} from "./BreadcrumbService";
import {BreadcrumbRepository} from "./BreadcrumbRepository";

@injectable()
export class BreadcrumbFactory {
    constructor(
        @inject(dependencies.BreadcrumbService) private readonly service: BreadcrumbService,
        @inject(dependencies.BreadcrumbRepository) private readonly repository: BreadcrumbRepository,
    ) {}

    async create(buffer: Buffer): Promise<Breadcrumb> {
        const id = v4();

        await this.repository.save(id, buffer);

        return {
            id,
            url: this.service.getUrl(id),
        };
    }
}
