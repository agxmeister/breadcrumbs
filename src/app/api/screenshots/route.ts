import * as fs from "node:fs";
import {v4} from "uuid";

export async function POST(request: Request): Promise<Response>
{
    const blob = await request.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const screenshotId = v4();

    fs.writeFile(`${process.env.SCREENSHOTS_DIR}/${screenshotId}.png`, buffer, (err) => {
        if (err) {
            console.error(`Failed to add a screenshot: ${err}`);
        }
    });

    return Response.json({
        id: screenshotId,
        date: Date.now(),
    });
}
