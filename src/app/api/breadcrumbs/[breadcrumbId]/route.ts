import {BreadcrumbService, BreadcrumbRepository} from "@/modules/breadcrumb";

export async function DELETE(
    _: Request,
    {params}: {params: Promise<{breadcrumbId: string}>},
): Promise<Response>
{
    const breadcrumbId = (await params).breadcrumbId;

    const dataDir = process.env.DATA_DIR || './data';
    const publicUrl = process.env.PUBLIC_URL || '';

    const repository = new BreadcrumbRepository();
    const service = new BreadcrumbService(dataDir, publicUrl, repository);

    try {
        await service.delete(breadcrumbId);

        return Response.json({
            id: breadcrumbId,
        });
    } catch (err) {
        if (err instanceof Error && 'code' in err && err.code === 'ENOENT') {
            return Response.json({
                id: breadcrumbId,
            });
        }

        const errorMessage = err instanceof Error ? err.message : String(err);
        return Response.json(
            { error: `Failed to delete breadcrumb: ${errorMessage}` },
            { status: 500 }
        );
    }
}
