import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const envEmail = process.env.ADMIN_EMAIL;
        const envPassword = process.env.ADMIN_PASSWORD;

        if (email === envEmail && password === envPassword) {
            // In a real app, you'd set a secure cookie here
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
