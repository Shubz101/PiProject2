import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyTelegramWebAppData } from '@/lib/telegram'

export async function POST(req: NextRequest) {
    try {
        const { paymentMethod } = await req.json()
        const telegramWebAppData = req.headers.get('x-telegram-web-app-data')

        if (!telegramWebAppData) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Verify the Telegram Web App data
        const userData = verifyTelegramWebAppData(telegramWebAppData)
        if (!userData) {
            return NextResponse.json({ error: 'Invalid Telegram Web App data' }, { status: 401 })
        }

        const telegramId = userData.id

        // Validate paymentMethod
        if (paymentMethod !== 'Binance' && paymentMethod !== 'UPI') {
            return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })
        }

        const updatedUser = await prisma.user.update({
            where: { telegramId },
            data: { paymentMethod },
        })

        return NextResponse.json({ success: true, user: updatedUser })
    } catch (error) {
        console.error('Error updating payment method:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
