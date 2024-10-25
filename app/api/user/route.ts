import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        const telegramIdStr = req.nextUrl.searchParams.get('telegramId')
        
        if (!telegramIdStr) {
            return NextResponse.json({ error: 'Telegram ID is required' }, { status: 400 })
        }

        const telegramId = parseInt(telegramIdStr)
        
        if (isNaN(telegramId)) {
            return NextResponse.json({ error: 'Invalid Telegram ID format' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { telegramId }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error('Error fetching user:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const { telegramId, paymentMethod, paymentAddress } = await req.json()
        
        if (typeof telegramId !== 'number' || isNaN(telegramId)) {
            return NextResponse.json({ error: 'Invalid or missing Telegram ID' }, { status: 400 })
        }

        // Find user by telegramId
        const user = await prisma.user.findUnique({
            where: { telegramId }
        })
        
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const updatedUser = await prisma.user.update({
            where: { telegramId },
            data: {
                paymentMethod,
                paymentAddress
            }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.error('Error updating user:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const telegramIdStr = req.nextUrl.searchParams.get('telegramId')
        
        if (!telegramIdStr) {
            return NextResponse.json({ error: 'Telegram ID is required' }, { status: 400 })
        }

        const telegramId = parseInt(telegramIdStr)
        
        if (isNaN(telegramId)) {
            return NextResponse.json({ error: 'Invalid Telegram ID format' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { telegramId }
        })
        
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const updatedUser = await prisma.user.update({
            where: { telegramId },
            data: {
                paymentMethod: null,
                paymentAddress: null
            }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.error('Error deleting payment info:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
