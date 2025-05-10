import { NextResponse } from 'next/server';

// Dummy user data (same as login)
const DUMMY_USERS = [
  {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User'
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user exists
    const user = DUMMY_USERS.find(u => u.email === email);

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // In a real application, you would:
    // 1. Generate a reset token
    // 2. Save it to the database with an expiry
    // 3. Send an email with the reset link

    // Success response
    return NextResponse.json({
      message: 'Password reset instructions sent to your email'
    });
  } catch (error) {
    console.error('forgot-password', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 