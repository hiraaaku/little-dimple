import { NextRequest, NextResponse } from 'next/server';

// Mock user data for reviews
const MOCK_USERS = [
  { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
  { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=2" },
  { name: "Mike Johnson", avatar: "https://i.pravatar.cc/150?img=3" },
  { name: "Sarah Williams", avatar: "https://i.pravatar.cc/150?img=4" },
  { name: "David Brown", avatar: "https://i.pravatar.cc/150?img=5" },
  { name: "Emily Davis", avatar: "https://i.pravatar.cc/150?img=6" },
  { name: "Robert Wilson", avatar: "https://i.pravatar.cc/150?img=7" },
  { name: "Lisa Anderson", avatar: "https://i.pravatar.cc/150?img=8" },
];

// Mock review templates
const REVIEW_TEMPLATES = [
  "Great product! The quality is excellent and it exceeded my expectations.",
  "Very satisfied with this purchase. Would definitely recommend to others.",
  "Good value for money. The product works as described.",
  "Amazing quality and fast shipping. Will buy again!",
  "Not bad, but could be better. Still worth the price.",
  "Excellent product with great features. Very happy with my purchase.",
  "The product is good but the delivery took longer than expected.",
  "Perfect for my needs. The quality is outstanding.",
  "Very disappointed with the quality. Expected better for this price.",
  "Good product overall, but there's room for improvement.",
];

// Function to generate mock reviews
function generateMockReviews(count = 50) {
  const reviews = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const user = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
    const reviewText = REVIEW_TEMPLATES[Math.floor(Math.random() * REVIEW_TEMPLATES.length)];
    const rating = Math.floor(Math.random() * 3) + 3; // Rating between 3-5
    const createdAt = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Random date within last 30 days
    
    reviews.push({
      review: reviewText,
      rating,
      createdAt: createdAt.toISOString(),
      user: {
        name: user.name,
        avatar: user.avatar
      }
    });
  }
  
  return reviews;
}

// Generate mock reviews
const MOCK_REVIEWS = generateMockReviews(50);

export async function GET(
  request: NextRequest,
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // In a real application, you would fetch reviews based on the product slug (params.slug)
    // For mock data, we'll just use the same reviews for all products
    const reviews = [...MOCK_REVIEWS];
    
    // Sort reviews by date (newest first)
    reviews.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    // Implement pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedReviews = reviews.slice(startIndex, endIndex);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const response = {
      data: paginatedReviews,
      meta: {
        total: reviews.length,
        page,
        limit,
        total_pages: Math.ceil(reviews.length / limit)
      }
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 