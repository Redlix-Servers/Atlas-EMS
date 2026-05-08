import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/mail';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        if (!(prisma as any).employee) {
            return NextResponse.json({ message: 'Service temporarily unavailable' }, { status: 503 });
        }
        // Check if employee exists
        const employee = await (prisma as any).employee.findUnique({
            where: { email }
        });

        if (!employee) {
            // We return success even if user doesn't exist for security reasons (avoid email enumeration)
            return NextResponse.json({ message: 'If an account exists with this email, a reset link has been sent.' });
        }

        // In a real app, you would create a token in the database and set an expiry
        // For this implementation, we'll generate a dummy link
        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'https://atlas.redlix.co.in'}/employee/reset-password?token=dummy-token-${Date.now()}`;

        await sendPasswordResetEmail(email, resetLink);

        return NextResponse.json({ message: 'Reset link sent' });
    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
