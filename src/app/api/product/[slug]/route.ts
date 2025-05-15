import { NextRequest, NextResponse } from 'next/server';

// Import the mock products from the parent route
import { MOCK_PRODUCTS } from '../route';

// Define product type
interface Product {
  id: string;
  name: string;
  rating: string;
  price: string;
  price_after_discount: string;
  discount_percentage: string;
  text_summary: string;
  stock: string;
  photos: Array<{
    title: string;
    link: string;
    is_main: boolean;
  }>;
  description: string;
  more_info: string;
  media_more_info: string;
  category: string;
  kode_produk: string;
  weight: string;
  size: string;
  label_1: string;
  label_2: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    // Find the product with the matching ID/slug
    const product = MOCK_PRODUCTS.find((p: Product) => p.id === slug || p.kode_produk === slug);

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 