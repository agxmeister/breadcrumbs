import {BreadcrumbFactory, BreadcrumbService, BreadcrumbRepository} from "@/modules/breadcrumb";

export async function POST(request: Request): Promise<Response>
{
    const blob = await request.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const dataDir = process.env.DATA_DIR || './data';
    const publicUrl = process.env.PUBLIC_URL || '';

    const repository = new BreadcrumbRepository();
    const service = new BreadcrumbService(dataDir, publicUrl, repository);
    const factory = new BreadcrumbFactory(service, repository);

    try {
        const breadcrumb = await factory.create(buffer);

        return Response.json({
            id: breadcrumb.id,
            url: breadcrumb.url,
        });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return Response.json(
            { error: `Failed to add breadcrumb: ${errorMessage}` },
            { status: 500 }
        );
    }
}
