import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper function to get the authenticated user
function getUserId(req: NextRequest) {
    // This is a placeholder. Adjust it based on your actual auth mechanism.
    return req.headers.get('telegramId'); // Or get it from session data
}

export async function GET(req: NextRequest) {
    const telegramId = getUserId(req);
    if (!telegramId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({ where: { telegramId } });
        return NextResponse.json(user || {});
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const telegramId = getUserId(req);
    if (!telegramId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { paymentMethod, paymentAddress } = await req.json();
        
        const user = await prisma.user.findUnique({ where: { telegramId } });
        if (!user) {
            return NextResponse.json({ error: 'No user found' }, { status: 404 });
        }

        const updatedUser = await prisma.user.update({
            where: { telegramId },
            data: { paymentMethod, paymentAddress },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const telegramId = getUserId(req);
    if (!telegramId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({ where: { telegramId } });
        if (!user) {
            return NextResponse.json({ error: 'No user found' }, { status: 404 });
        }

        const updatedUser = await prisma.user.update({
            where: { telegramId },
            data: { paymentMethod: null, paymentAddress: null },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error deleting payment info:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
