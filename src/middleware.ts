import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

export function middleware(request: NextRequest) {
    const authorization = request.headers.get('Authorization');
    if (authorization !== `Bearer ${process.env.ACCESS_TOKEN}`) {
        return NextResponse.json({
            error: "You have to provide an access token.",
        }, {
            status: 401,
        });
    }
}

export const config = {
    matcher: '/api/:path*',
}
