import * as fs from "node:fs/promises";
import * as path from "node:path";

export async function DELETE(
    _: Request,
    {params}: {params: Promise<{breadcrumbId: string}>},
): Promise<Response>
{
    const breadcrumbId = (await params).breadcrumbId;

    const filePath = path.join(
        process.env.DATA_DIR || './data',
        'breadcrumbs',
        breadcrumbId.substring(0, 2),
        breadcrumbId.substring(0, 4),
        `${breadcrumbId}.png`,
    );

    try {
        await fs.unlink(filePath);

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
