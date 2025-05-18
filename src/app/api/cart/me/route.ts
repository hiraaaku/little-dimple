import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Helper function to verify bearer token
const verifyToken = (token: string | null) => {
  if (!token) return false;
  // In a real application, you would verify the JWT token here
  // For now, we'll just check if it starts with 'dummy_jwt_token_'
  return token.startsWith('dummy_jwt_token_');
};

// Mock data for demonstration
const mockCartItems = [
  {
    media_link: "https://example.com/image1.jpg",
    product_name: "Product 1",
    quantity: 2,
    price: 100000
  },
  {
    media_link: "https://example.com/image2.jpg",
    product_name: "Product 2",
    quantity: 1,
    price: 150000
  },
  {
    media_link: "https://example.com/image3.jpg",
    product_name: "Product 3",
    quantity: 3,
    price: 75000
  }
];

export async function GET(request: Request) {
  try {
    // Get authorization header
    const headersList = await headers();
    const authorization = headersList.get('authorization');

    // Check if token exists and is valid
    if (!authorization || !verifyToken(authorization.split(' ')[1])) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get pagination parameters from URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Validate pagination parameters
    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { message: 'Invalid pagination parameters. page and limit must be greater than 0' },
        { status: 400 }
      );
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = mockCartItems.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedItems
    });
  } catch (error: unknown) {
    console.error('Error in cart API:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Get authorization header
    const headersList = await headers();
    const authorization = headersList.get('authorization');

    // Check if token exists and is valid
    if (!authorization || !verifyToken(authorization.split(' ')[1])) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get request body
    const body = await request.json();
    const { media_link, product_name, quantity, price } = body;

    // Validate request body
    if (!media_link || !product_name || !quantity || !price || quantity < 1 || price < 0) {
      return NextResponse.json(
        { message: 'Invalid request body. media_link, product_name, quantity (min 1), and price (min 0) are required' },
        { status: 400 }
      );
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create new cart item
    const newCartItem = {
      media_link,
      product_name,
      quantity,
      price
    };

    // Add to mockCartItems (in a real app, this would be a database operation)
    mockCartItems.push(newCartItem);

    return NextResponse.json({
      message: 'Item added to cart successfully',
      data: newCartItem
    });
  } catch (error: unknown) {
    console.error('Error in cart API:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 