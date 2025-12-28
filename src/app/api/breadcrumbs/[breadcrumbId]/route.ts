import {container} from "@/container";
import {dependencies} from "@/dependencies";
import {BreadcrumbService} from "@/modules/breadcrumb";

export async function DELETE(
    _: Request,
    {params}: {params: Promise<{breadcrumbId: string}>},
): Promise<Response>
{
    const breadcrumbId = (await params).breadcrumbId;

    const service = container.get<BreadcrumbService>(dependencies.BreadcrumbService);

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
