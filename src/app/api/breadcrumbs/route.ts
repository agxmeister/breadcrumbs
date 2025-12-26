import * as fs from "node:fs/promises";
import {v4} from "uuid";
import * as path from "node:path";

export async function POST(request: Request): Promise<Response>
{
    const blob = await request.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const breadcrumbId = v4();

    const dirPath = path.join(
        process.env.DATA_DIR || './data',
        'breadcrumbs',
        breadcrumbId.substring(0, 2),
        breadcrumbId.substring(0, 4),
    );
    const filePath = path.join(dirPath, `${breadcrumbId}.png`);

    try {
        await fs.mkdir(dirPath, { recursive: true });
        await fs.writeFile(filePath, buffer);

        return Response.json({
            id: breadcrumbId,
            url: `${process.env.PUBLIC_URL}/breadcrumbs/${breadcrumbId}`,
        });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return Response.json(
            { error: `Failed to add breadcrumb: ${errorMessage}` },
            { status: 500 }
        );
    }
}
