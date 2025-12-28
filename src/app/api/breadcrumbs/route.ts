import {container} from "@/container";
import {dependencies} from "@/dependencies";
import {BreadcrumbFactory} from "@/modules/breadcrumb";

export async function POST(request: Request): Promise<Response>
{
    const blob = await request.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const factory = container.get<BreadcrumbFactory>(dependencies.BreadcrumbFactory);

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
