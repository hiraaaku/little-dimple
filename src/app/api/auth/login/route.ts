import { NextResponse } from 'next/server';

// Dummy user data
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
    const { email, password } = body;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user
    const user = DUMMY_USERS.find(u => u.email === email);

    // Check credentials
    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Success response
    const response = {
      token: 'dummy_jwt_token_' + Date.now(),
      user: {
        email: user.email,
        name: user.name
      }
    };
    return NextResponse.json(response);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 