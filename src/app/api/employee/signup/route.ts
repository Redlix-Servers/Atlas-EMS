import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { login } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { email, password, company } = await request.json();

        if (!email || !password || !company) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const existingUser = await prisma.employee.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const employee = await prisma.employee.create({
            data: {
                email,
                password: hashedPassword,
                company
            }
        });

        await login({ id: employee.id, email: employee.email, company: employee.company });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
