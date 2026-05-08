import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const { 
            fullName, role, phoneNumber, dob, upiId, 
            fatherName, fatherPhoneNumber, college, isGraduated,
            profilePhoto
        } = data;

        const updatedEmployee = await prisma.employee.update({
            where: { id: session.id },
            data: {
                fullName,
                role,
                phoneNumber,
                dob: dob ? new Date(dob) : null,
                upiId,
                fatherName,
                fatherPhoneNumber,
                college,
                isGraduated: Boolean(isGraduated),
                profilePhoto,
                isProfileComplete: true
            }
        });

        return NextResponse.json({ success: true, employee: updatedEmployee });
    } catch (error) {
        console.error('Profile update error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const employee = await prisma.employee.findUnique({
            where: { id: session.id }
        });

        return NextResponse.json(employee);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
