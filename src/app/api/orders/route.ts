import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/orders?userId=xxx - Get orders for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const orders = await db.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

// POST /api/orders - Create a new order with items
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, totalAmount, items } = body

    if (!userId || totalAmount === undefined || !items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const order = await db.order.create({
      data: {
        userId,
        status: 'pending',
        totalAmount,
        items: {
          create: items.map((item: { iphoneModel: string; service: string; quality: string; price: number; description: string; order: number }) => ({
            iphoneModel: item.iphoneModel,
            service: item.service,
            quality: item.quality,
            price: item.price,
            description: item.description,
          })),
        },
      },
      include: { items: true },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
