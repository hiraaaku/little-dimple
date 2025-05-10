import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        // Get token from Authorization header or request body
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '') || 
                     (await request.json()).auth_token;

        // Validate token presence
        if (!token) {
            return NextResponse.json(
                { valid: false, reason: 'No token provided' },
                { status: 401 }
            );
        }

        // Simulate token validation
        // In real app, you would verify JWT token here
        if (token === 'expiredtoken') {
            return NextResponse.json(
                { valid: false, reason: 'Token expired' },
                { status: 401 }
            );
        }

        // Mock user data for valid token
        const userData = {
            id: '1',
            email: 'user@example.com',
            name: 'Test User'
        };

        // Return success response with user data
        return NextResponse.json({
            valid: true,
            user: userData
        });
    } catch (error) {
        console.error('Token validation error:', error);
        return NextResponse.json(
            { valid: false, reason: 'Invalid token format' },
            { status: 400 }
        );
    }
}

// Optional: Add GET method for token validation
export async function GET(request: NextRequest) {
    try {
        // Get token from Authorization header
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json(
                { valid: false, reason: 'No token provided' },
                { status: 401 }
            );
        }

        // Simulate token validation
        if (token === 'expiredtoken') {
            return NextResponse.json(
                { valid: false, reason: 'Token expired' },
                { status: 401 }
            );
        }

        // Mock user data for valid token
        const userData = {
            id: '1',
            email: 'user@example.com',
            name: 'Test User'
        };

        return NextResponse.json({
            valid: true,
            user: userData
        });
    } catch (error) {
        console.error('Token validation error:', error);
        return NextResponse.json(
            { valid: false, reason: 'Invalid token format' },
            { status: 400 }
        );
    }
}
