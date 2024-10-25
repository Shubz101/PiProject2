import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        const user = await prisma.user.findFirst()
        return NextResponse.json(user || {})
    } catch (error) {
        console.error('Error fetching user:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const userData = await req.json()
        const telegramId = userData.telegramId || userData.id
        
        if (!telegramId) {
            return NextResponse.json({ error: 'Telegram ID required' }, { status: 400 })
        }

        const updateData: any = {
            paymentMethod: userData.paymentMethod,
            paymentAddress: userData.paymentAddress
        }

        const user = await prisma.user.update({
            where: { telegramId: parseInt(telegramId) },
            data: updateData
        })

        return NextResponse.json(user)
    } catch (error) {
        console.error('Error updating user:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
