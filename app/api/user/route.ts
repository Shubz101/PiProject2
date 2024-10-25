import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Helper function to get telegramId from the session/cookie
async function getTelegramId(req: NextRequest) {
    // Get telegramId from your auth cookie/session
    const telegramId = req.cookies.get('telegramId')?.value 
    
    if (!telegramId) {
        throw new Error('Not authenticated')
    }
    
    return parseInt(telegramId)
}

export async function GET(req: NextRequest) {
    try {
        const telegramId = await getTelegramId(req)
        
        const user = await prisma.user.findUnique({
            where: {
                telegramId: telegramId
            }
        })
        
        return NextResponse.json(user || {})
    } catch (error) {
        console.error('Error fetching user:', error)
        if (error.message === 'Not authenticated') {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const telegramId = await getTelegramId(req)
        const { paymentMethod, paymentAddress } = await req.json()
        
        const user = await prisma.user.findUnique({
            where: {
                telegramId: telegramId
            }
        })
        
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const updatedUser = await prisma.user.update({
            where: {
                telegramId: telegramId
            },
            data: {
                paymentMethod,
                paymentAddress
            }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.error('Error updating user:', error)
        if (error.message === 'Not authenticated') {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const telegramId = await getTelegramId(req)
        
        const user = await prisma.user.findUnique({
            where: {
                telegramId: telegramId
            }
        })
        
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const updatedUser = await prisma.user.update({
            where: {
                telegramId: telegramId
            },
            data: {
                paymentMethod: null,
                paymentAddress: null
            }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.error('Error deleting payment info:', error)
        if (error.message === 'Not authenticated') {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
