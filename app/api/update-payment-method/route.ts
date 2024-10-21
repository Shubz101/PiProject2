import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const { paymentMethod } = await req.json()
        const telegramWebAppData = req.headers.get('x-telegram-web-app-data')

        if (!telegramWebAppData) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Validate paymentMethod
        if (paymentMethod !== 'Binance' && paymentMethod !== 'UPI') {
            return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })
        }

        const updatedUser = await prisma.user.update({
            data: { paymentMethod },
        })

        return NextResponse.json({ success: true, user: updatedUser })
    } catch (error) {
        console.error('Error updating payment method:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
