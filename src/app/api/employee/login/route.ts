import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { login } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const employee = await (prisma as any).employee.findUnique({
            where: { email }
        });

        if (!employee) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, employee.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        await login({ id: employee.id, email: employee.email, company: employee.company });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
