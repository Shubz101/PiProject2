import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Helper function to get telegramId from the request
async function getTelegramId(req: NextRequest) {
    // You'll need to implement your own way to get the telegram ID from the session/token
    // This is just a placeholder - replace with your actual authentication logic
    const telegramId = req.headers.get('x-telegram-id')
    if (!telegramId) {
        throw new Error('Unauthorized - No telegram ID found')
    }
    return parseInt(telegramId)
}

export async function GET(req: NextRequest) {
    try {
        const telegramId = await getTelegramId(req)
        const user = await prisma.user.findUnique({
            where: { telegramId }
        })
        
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }
        
        return NextResponse.json(user)
    } catch (error) {
        console.error('Error fetching user:', error)
        if (error.message.includes('Unauthorized')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const telegramId = await getTelegramId(req)
        const { paymentMethod, paymentAddress } = await req.json()
        
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
        if (error.message.includes('Unauthorized')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const telegramId = await getTelegramId(req)
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
        if (error.message.includes('Unauthorized')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
