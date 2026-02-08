import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        const adminUser = process.env.ADMIN_USERNAME || 'admin';
        const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

        if (username === adminUser && password === adminPass) {
            // Set a cookie for simple session management
            // In a real app, use a proper session library or JWT
            const cookieStore = await cookies();
            cookieStore.set('admin_session', 'true', {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });

            return NextResponse.json({ success: true, message: 'Login successful' });
        }

        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
