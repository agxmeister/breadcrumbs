import fs from "node:fs";

export async function DELETE(
    _: Request,
    {params}: {params: Promise<{screenshotId: string}>},
): Promise<Response>
{
    const screenshotId = (await params).screenshotId;

    fs.unlink(`${process.env.SCREENSHOTS_DIR}/${screenshotId}.png`, (err) => {
        if (err) {
            console.error(`Failed to remove a screenshot: ${err}`);
        }
    });

    return Response.json({
        id: screenshotId,
        date: Date.now(),
    });
}
