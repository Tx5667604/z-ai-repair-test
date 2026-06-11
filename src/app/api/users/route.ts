import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/users?email=xxx - Get user by email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

// POST /api/users - Create or find user by email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, phone } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Try to find existing user
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      // Update name/phone if provided
      const updatedUser = await db.user.update({
        where: { id: existingUser.id },
        data: {
          ...(name && { name }),
          ...(phone && { phone }),
        },
      })
      return NextResponse.json(updatedUser)
    }

    // Create new user
    const user = await db.user.create({
      data: {
        email,
        name: name || null,
        phone: phone || null,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
