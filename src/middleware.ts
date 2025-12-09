import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Evitar procesar archivos estáticos y API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    try {
        // Obtener token con configuración explícita
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        // Rutas públicas (login y register)
        const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

        // Rutas protegidas
        const isClientRoute = pathname.startsWith('/client') || pathname.startsWith('/dashboard') || pathname.startsWith('/tickets');
        const isAgentRoute = pathname.startsWith('/agent');
        const isProtectedRoute = isClientRoute || isAgentRoute;

        // Si el usuario está logueado y trata de acceder a login o register
        if (token && isAuthPage) {
            // Redirigir según el rol
            const userRole = token.role as string;
            if (userRole === 'AGENT') {
                return NextResponse.redirect(new URL('/agent/dashboard', request.url));
            } else {
                return NextResponse.redirect(new URL('/client/dashboard', request.url));
            }
        }

        // Si el usuario NO está logueado y trata de acceder a rutas protegidas
        if (!token && isProtectedRoute) {
            const url = new URL('/login', request.url);
            url.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(url);
        }

        // Protección de rutas por rol
        if (token && isProtectedRoute) {
            const userRole = token.role as string;
            
            // Si es cliente intentando acceder a rutas de agente
            if (userRole === 'CLIENT' && isAgentRoute) {
                return NextResponse.redirect(new URL('/client/dashboard', request.url));
            }
            
            // Si es agente intentando acceder a rutas de cliente
            if (userRole === 'AGENT' && isClientRoute) {
                return NextResponse.redirect(new URL('/agent/dashboard', request.url));
            }
        }

        // Permitir acceso en todos los demás casos
        return NextResponse.next();
    } catch (error) {
        console.error('[Middleware] Error:', error);
        // En caso de error, permitir acceso pero loggearlo
        return NextResponse.next();
    }
}

// Especificar en qué rutas se ejecutará el middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes - incluye NextAuth)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
    ],
};
