import { prisma, refreshPrisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            orderBy: { date: 'asc' }
        });
        return NextResponse.json(events);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { title, description, date, location, type } = data;

        let eventModel = (prisma as any).event;
        
        if (!eventModel) {
            // Force a refresh of the singleton client
            const freshPrisma = refreshPrisma();
            eventModel = (freshPrisma as any).event;
        }

        if (!eventModel) {
            throw new Error('Prisma model "event" is still not recognized. Please restart the dev server if this persists.');
        }

        const newEvent = await eventModel.create({
            data: {
                title,
                description,
                date: new Date(date),
                location,
                type
            }
        });

        return NextResponse.json(newEvent);
    } catch (err: any) {
        console.error('Event Creation Error:', err);
        return NextResponse.json({ error: 'Failed to create event', details: err.message }, { status: 500 });
    }
}
