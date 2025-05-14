import { NextRequest, NextResponse } from 'next/server';

// Mock products data
const MOCK_PRODUCTS = [
  {
    name: "Smartphone Pro Max",
    rating: "4.8",
    price: "12000000",
    price_after_discount: "10000000",
    discount_percentage: "17",
    text_summary: "Latest flagship smartphone with advanced features",
    stock: "25",
    photos: [
      { title: "Front View", link: "/images/phone-front.jpg", is_main: true },
      { title: "Back View", link: "/images/phone-back.jpg", is_main: false },
      { title: "Side View", link: "/images/phone-side.jpg", is_main: false },
      { title: "In Use", link: "/images/phone-use.jpg", is_main: false }
    ],
    description: "Experience the ultimate smartphone with cutting-edge technology, premium design, and exceptional performance.",
    more_info: "Features include 5G connectivity, advanced camera system, and all-day battery life.",
    media_more_info: "/videos/phone-demo.mp4",
    category: "electronics",
    kode_produk: "SPM-001",
    weight: "200g",
    size: "15.5 x 7.5 x 0.8 cm",
    label_1: "Best Seller",
    label_2: "Premium"
  },
  {
    name: "Wireless Headphones",
    rating: "4.5",
    price: "2500000",
    price_after_discount: "2000000",
    discount_percentage: "20",
    text_summary: "Premium noise-cancelling wireless headphones",
    stock: "50",
    photos: [
      { title: "Product Shot", link: "/images/headphones-main.jpg", is_main: true },
      { title: "Detail View", link: "/images/headphones-detail.jpg", is_main: false },
      { title: "Packaging", link: "/images/headphones-box.jpg", is_main: false },
      { title: "Color Options", link: "/images/headphones-colors.jpg", is_main: false }
    ],
    description: "Immerse yourself in crystal-clear audio with advanced noise cancellation technology.",
    more_info: "Battery life up to 30 hours, quick charge feature, and premium comfort padding.",
    media_more_info: "/videos/headphones-review.mp4",
    category: "electronics",
    kode_produk: "WH-002",
    weight: "250g",
    size: "18 x 15 x 8 cm",
    label_1: "Popular",
    label_2: "High Quality"
  },
  {
    name: "Cotton T-Shirt",
    rating: "4.2",
    price: "150000",
    price_after_discount: "120000",
    discount_percentage: "20",
    text_summary: "Comfortable 100% organic cotton t-shirt",
    stock: "100",
    photos: [
      { title: "Front View", link: "/images/tshirt-front.jpg", is_main: true },
      { title: "Back View", link: "/images/tshirt-back.jpg", is_main: false },
      { title: "Fabric Detail", link: "/images/tshirt-fabric.jpg", is_main: false },
      { title: "Model Wearing", link: "/images/tshirt-model.jpg", is_main: false }
    ],
    description: "Soft, breathable, and sustainable cotton t-shirt perfect for everyday wear.",
    more_info: "Available in various colors and sizes. Machine washable and fade-resistant.",
    media_more_info: "/images/tshirt-care-guide.jpg",
    category: "clothing",
    kode_produk: "CT-003",
    weight: "180g",
    size: "Various (S-XXL)",
    label_1: "Eco-Friendly",
    label_2: "Comfort Fit"
  },
  {
    name: "Gaming Laptop",
    rating: "4.7",
    price: "25000000",
    price_after_discount: "22000000",
    discount_percentage: "12",
    text_summary: "High-performance gaming laptop with RTX graphics",
    stock: "15",
    photos: [
      { title: "Laptop Open", link: "/images/laptop-open.jpg", is_main: true },
      { title: "Laptop Closed", link: "/images/laptop-closed.jpg", is_main: false },
      { title: "Ports View", link: "/images/laptop-ports.jpg", is_main: false },
      { title: "Gaming Setup", link: "/images/laptop-gaming.jpg", is_main: false }
    ],
    description: "Unleash your gaming potential with this powerful laptop featuring latest generation processors and graphics.",
    more_info: "16GB RAM, 1TB SSD, 144Hz display, RGB keyboard, advanced cooling system.",
    media_more_info: "/videos/gaming-performance.mp4",
    category: "electronics",
    kode_produk: "GL-004",
    weight: "2.3kg",
    size: "35.5 x 25.5 x 2.3 cm",
    label_1: "Gaming",
    label_2: "High Performance"
  },
  {
    name: "Yoga Mat Premium",
    rating: "4.4",
    price: "500000",
    price_after_discount: "400000",
    discount_percentage: "20",
    text_summary: "Non-slip premium yoga mat with alignment lines",
    stock: "75",
    photos: [
      { title: "Full Mat", link: "/images/yoga-mat-full.jpg", is_main: true },
      { title: "Texture Detail", link: "/images/yoga-mat-texture.jpg", is_main: false },
      { title: "Rolled Up", link: "/images/yoga-mat-rolled.jpg", is_main: false },
      { title: "In Use", link: "/images/yoga-mat-use.jpg", is_main: false }
    ],
    description: "Professional-grade yoga mat with superior grip and cushioning for all practice levels.",
    more_info: "6mm thickness, eco-friendly materials, includes carrying strap and mat bag.",
    media_more_info: "/videos/yoga-mat-guide.mp4",
    category: "sports",
    kode_produk: "YM-005",
    weight: "1.2kg",
    size: "183 x 61 x 0.6 cm",
    label_1: "Premium",
    label_2: "Eco-Friendly"
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sort_by') || 'popular';
    const category = searchParams.get('category');
    const keyword = searchParams.get('keyword');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredProducts = [...MOCK_PRODUCTS];

    // Filter by category
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by keyword (search in product name)
    if (keyword) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'popular':
        filteredProducts.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'newest':
        // For mock data, we'll reverse the order to simulate newest first
        filteredProducts.reverse();
        break;
      case 'price low to high':
        filteredProducts.sort((a, b) => 
          parseInt(a.price_after_discount) - parseInt(b.price_after_discount)
        );
        break;
      case 'price high to low':
        filteredProducts.sort((a, b) => 
          parseInt(b.price_after_discount) - parseInt(a.price_after_discount)
        );
        break;
      default:
        // Default to popular
        filteredProducts.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }

    // Implement pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Add more mock data if needed to fill pagination
    const totalProducts = filteredProducts.length;
    const additionalProductsNeeded = Math.max(0, limit - paginatedProducts.length);
    
    // If we need more products and there are some, duplicate them with slight variations
    if (additionalProductsNeeded > 0 && MOCK_PRODUCTS.length > 0) {
      for (let i = 0; i < additionalProductsNeeded; i++) {
        const baseProduct = MOCK_PRODUCTS[i % MOCK_PRODUCTS.length];
        paginatedProducts.push({
          ...baseProduct,
          name: `${baseProduct.name} Variant ${i + 1}`,
          kode_produk: `${baseProduct.kode_produk}-V${i + 1}`,
          price: (parseInt(baseProduct.price) + (i * 100000)).toString(),
          price_after_discount: (parseInt(baseProduct.price_after_discount) + (i * 80000)).toString()
        });
      }
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = {
      data: paginatedProducts,
      meta: {
        total: totalProducts,
        page,
        limit,
        total_pages: Math.ceil(totalProducts / limit)
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 