import * as fs from "node:fs/promises";
import * as path from "node:path";

export async function DELETE(
    _: Request,
    {params}: {params: Promise<{screenshotId: string}>},
): Promise<Response>
{
    const screenshotId = (await params).screenshotId;

    const filePath = path.join(
        process.env.SCREENSHOTS_DIR!,
        screenshotId.substring(0, 2),
        screenshotId.substring(0, 4),
        `${screenshotId}.png`,
    );

    try {
        await fs.unlink(filePath);

        return Response.json({
            id: screenshotId,
        });
    } catch (err) {
        if (err instanceof Error && 'code' in err && err.code === 'ENOENT') {
            return Response.json({
                id: screenshotId,
            });
        }

        const errorMessage = err instanceof Error ? err.message : String(err);
        return Response.json(
            { error: `Failed to delete breadcrumb: ${errorMessage}` },
            { status: 500 }
        );
    }
}
