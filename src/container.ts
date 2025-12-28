import "reflect-metadata";
import {Container} from "inversify";
import {dependencies} from "./dependencies";
import {BreadcrumbRepository} from "./modules/breadcrumb/BreadcrumbRepository";
import {BreadcrumbService} from "./modules/breadcrumb/BreadcrumbService";
import {BreadcrumbFactory} from "./modules/breadcrumb/BreadcrumbFactory";

const container = new Container();

// Bind configuration values
container.bind<string>(dependencies.DATA_BASE_PATH).toConstantValue(process.env.DATA_DIR || './data');
container.bind<string>(dependencies.PUBLIC_URL).toConstantValue(process.env.PUBLIC_URL || '');

// Bind services
container.bind<BreadcrumbRepository>(dependencies.BreadcrumbRepository).to(BreadcrumbRepository);
container.bind<BreadcrumbService>(dependencies.BreadcrumbService).to(BreadcrumbService);
container.bind<BreadcrumbFactory>(dependencies.BreadcrumbFactory).to(BreadcrumbFactory);

export {container};
