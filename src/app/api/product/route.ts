import { NextRequest, NextResponse } from 'next/server';

// Base product templates
const PRODUCT_TEMPLATES = [
  {
    name: "Smartphone Pro Max",
    basePrice: 12000000,
    discountPercentage: 17,
    rating: 4.8,
    text_summary: "Latest flagship smartphone with advanced features",
    baseStock: 25,
    photos: [
      { title: "Front View", link: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60", is_main: true },
      { title: "Back View", link: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "Side View", link: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "In Use", link: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&auto=format&fit=crop&q=60", is_main: false }
    ],
    description: "<h2>Experience the Ultimate Smartphone</h2><p>Experience the ultimate smartphone with <strong>cutting-edge technology</strong>, premium design, and exceptional performance.</p><ul><li>Advanced 5G connectivity</li><li>Professional-grade camera system</li><li>All-day battery life</li><li>Premium build quality</li></ul>",
    more_info: "Features include 5G connectivity, advanced camera system, and all-day battery life.",
    media_more_info: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "electronic",
    kodePrefix: "SPM",
    weight: "200g",
    size: "15.5 x 7.5 x 0.8 cm",
    label_1: "Best Seller",
    label_2: "Premium"
  },
  {
    name: "Wireless Headphones",
    basePrice: 2500000,
    discountPercentage: 20,
    rating: 4.5,
    text_summary: "Premium noise-cancelling wireless headphones",
    baseStock: 50,
    photos: [
      { title: "Product Shot", link: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60", is_main: true },
      { title: "Detail View", link: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "Packaging", link: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "Color Options", link: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop&q=60", is_main: false }
    ],
    description: "<h2>Premium Audio Experience</h2><p>Immerse yourself in <em>crystal-clear audio</em> with advanced noise cancellation technology.</p><div class='features'><h3>Key Features:</h3><ul><li>Active Noise Cancellation</li><li>30-hour battery life</li><li>Quick charge capability</li><li>Premium comfort padding</li></ul></div>",
    more_info: "Battery life up to 30 hours, quick charge feature, and premium comfort padding.",
    media_more_info: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "electronic",
    kodePrefix: "WH",
    weight: "250g",
    size: "18 x 15 x 8 cm",
    label_1: "Popular",
    label_2: "High Quality"
  },
  {
    name: "Cotton T-Shirt",
    basePrice: 150000,
    discountPercentage: 20,
    rating: 4.2,
    text_summary: "Comfortable 100% organic cotton t-shirt",
    baseStock: 100,
    photos: [
      { title: "Front View", link: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60", is_main: true },
      { title: "Back View", link: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "Fabric Detail", link: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "Model Wearing", link: "https://images.unsplash.com/photo-1503341733017-1901578f9f1e?w=500&auto=format&fit=crop&q=60", is_main: false }
    ],
    description: "<h2>Sustainable Comfort</h2><p>Soft, breathable, and <strong>sustainable</strong> cotton t-shirt perfect for everyday wear.</p><div class='product-details'><h3>Product Details:</h3><ul><li>100% Organic Cotton</li><li>Machine Washable</li><li>Fade Resistant</li><li>Available in Multiple Sizes</li></ul></div>",
    more_info: "Available in various colors and sizes. Machine washable and fade-resistant.",
    media_more_info: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60",
    category: "newborn_essentials",
    kodePrefix: "CT",
    weight: "180g",
    size: "Various (S-XXL)",
    label_1: "Eco-Friendly",
    label_2: "Comfort Fit"
  },
  {
    name: "Gaming Laptop",
    basePrice: 25000000,
    discountPercentage: 12,
    rating: 4.7,
    text_summary: "High-performance gaming laptop with RTX graphics",
    baseStock: 15,
    photos: [
      { title: "Laptop Open", link: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&auto=format&fit=crop&q=60", is_main: true },
      { title: "Laptop Closed", link: "https://images.unsplash.com/photo-1504707748692-419802cf939d?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "Ports View", link: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "Gaming Setup", link: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&auto=format&fit=crop&q=60", is_main: false }
    ],
    description: "<h2>Ultimate Gaming Performance</h2><p>Unleash your gaming potential with this <strong>powerful laptop</strong> featuring latest generation processors and graphics.</p><div class='specs'><h3>Technical Specifications:</h3><ul><li>16GB RAM</li><li>1TB SSD Storage</li><li>144Hz Display</li><li>RGB Keyboard</li><li>Advanced Cooling System</li></ul></div>",
    more_info: "16GB RAM, 1TB SSD, 144Hz display, RGB keyboard, advanced cooling system.",
    media_more_info: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "electronic",
    kodePrefix: "GL",
    weight: "2.3kg",
    size: "35.5 x 25.5 x 2.3 cm",
    label_1: "Gaming",
    label_2: "High Performance"
  },
  {
    name: "Yoga Mat Premium",
    basePrice: 500000,
    discountPercentage: 20,
    rating: 4.4,
    text_summary: "Non-slip premium yoga mat with alignment lines",
    baseStock: 75,
    photos: [
      { title: "Full Mat", link: "https://images.unsplash.com/photo-1599447292461-38fb6e9a2c1d?w=500&auto=format&fit=crop&q=60", is_main: true },
      { title: "Texture Detail", link: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "Rolled Up", link: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "In Use", link: "https://images.unsplash.com/photo-1508050249562-b28a87a39e07?w=500&auto=format&fit=crop&q=60", is_main: false }
    ],
    description: "<h2>Professional Yoga Experience</h2><p>Professional-grade yoga mat with <em>superior grip</em> and cushioning for all practice levels.</p><div class='features'><h3>Product Features:</h3><ul><li>6mm Thickness</li><li>Eco-friendly Materials</li><li>Includes Carrying Strap</li><li>Includes Mat Bag</li><li>Non-slip Surface</li></ul></div>",
    more_info: "6mm thickness, eco-friendly materials, includes carrying strap and mat bag.",
    media_more_info: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "non-electronic",
    kodePrefix: "YM",
    weight: "1.2kg",
    size: "183 x 61 x 0.6 cm",
    label_1: "Premium",
    label_2: "Eco-Friendly"
  },
  {
    name: "Fitness Tracker",
    basePrice: 1500000,
    discountPercentage: 15,
    rating: 4.3,
    text_summary: "Advanced fitness and health tracking wearable",
    baseStock: 45,
    photos: [
      { title: "On Wrist", link: "https://images.unsplash.com/photo-1557935728-e6d1eae9a852?w=500&auto=format&fit=crop&q=60", is_main: true },
      { title: "Device Only", link: "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "App Interface", link: "https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "Charging", link: "https://images.unsplash.com/photo-1544117519-31a4a57314b3?w=500&auto=format&fit=crop&q=60", is_main: false }
    ],
    description: "<h2>Smart Health Companion</h2><p>Monitor your health and fitness goals with this <strong>advanced wearable tracker</strong>.</p><div class='features'><h3>Key Features:</h3><ul><li>Heart Rate Monitoring</li><li>Sleep Tracking</li><li>GPS Navigation</li><li>Water Resistant (50m)</li><li>Long Battery Life</li></ul></div>",
    more_info: "Heart rate monitoring, sleep tracking, GPS, water-resistant up to 50m.",
    media_more_info: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "electronic",
    kodePrefix: "FT",
    weight: "28g",
    size: "22 x 18 x 11.5 mm",
    label_1: "Fitness",
    label_2: "Smart Device"
  },
  {
    name: "Coffee Maker Deluxe",
    basePrice: 3500000,
    discountPercentage: 10,
    rating: 4.6,
    text_summary: "Premium automatic coffee maker with grinder",
    baseStock: 20,
    photos: [
      { title: "Front View", link: "https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?w=500&auto=format&fit=crop&q=60", is_main: true },
      { title: "Side View", link: "https://images.unsplash.com/photo-1608354580875-30bd4168b351?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "Control Panel", link: "https://images.unsplash.com/photo-1606791405792-1004f1718d0c?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "In Use", link: "https://images.unsplash.com/photo-1574914629385-46b1d2633c5c?w=500&auto=format&fit=crop&q=60", is_main: false }
    ],
    description: "<h2>Barista-Quality Coffee at Home</h2><p>Brew <em>barista-quality coffee</em> at home with this premium automatic coffee machine.</p><div class='features'><h3>Premium Features:</h3><ul><li>Built-in Grinder</li><li>Milk Frother</li><li>Programmable Settings</li><li>Easy Cleaning System</li><li>Multiple Brew Options</li></ul></div>",
    more_info: "Built-in grinder, milk frother, programmable settings, and easy cleaning system.",
    media_more_info: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "cooker",
    kodePrefix: "CM",
    weight: "8.5kg",
    size: "38 x 28 x 40 cm",
    label_1: "Premium",
    label_2: "Barista Quality"
  },
  {
    name: "Designer Handbag",
    basePrice: 8000000,
    discountPercentage: 5,
    rating: 4.9,
    text_summary: "Luxury designer handbag made from genuine leather",
    baseStock: 10,
    photos: [
      { title: "Front View", link: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60", is_main: true },
      { title: "Inside View", link: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "Detail View", link: "https://images.unsplash.com/photo-1591561954555-607968c989ab?w=500&auto=format&fit=crop&q=60", is_main: false },
      { title: "Styling", link: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60", is_main: false }
    ],
    description: "<h2>Luxury Craftsmanship</h2><p>Exquisite craftsmanship in this <strong>genuine leather</strong> designer handbag with signature detailing.</p><div class='features'><h3>Premium Details:</h3><ul><li>Handcrafted Design</li><li>Genuine Leather</li><li>Signature Hardware</li><li>Includes Dust Bag</li><li>Limited Edition</li></ul></div>",
    more_info: "Handcrafted, genuine leather, signature hardware, dust bag included.",
    media_more_info: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60",
    category: "cups_bottles",
    kodePrefix: "DH",
    weight: "850g",
    size: "35 x 25 x 15 cm",
    label_1: "Luxury",
    label_2: "Limited Edition"
  }
];

// Function to generate a large dataset of products
function generateMockProducts(count = 100) {
  const products = [];
  const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Silver', 'Gold', 'Pink', 'Purple', 'Orange'];
  const variants = ['Pro', 'Lite', 'Plus', 'Max', 'Ultra', 'Standard', 'Limited Edition', 'Classic', 'Next Gen', 'Premium'];
  
  for (let i = 0; i < count; i++) {
    // Select a base template (cycling through available templates)
    const template = PRODUCT_TEMPLATES[i % PRODUCT_TEMPLATES.length];
    
    // Add variation to make each product unique
    const colorVariant = colors[Math.floor(Math.random() * colors.length)];
    const modelVariant = variants[Math.floor(Math.random() * variants.length)];
    
    // Randomize pricing and stock slightly
    const priceVariation = Math.random() * 0.2 - 0.1; // -10% to +10%
    const basePrice = Math.round(template.basePrice * (1 + priceVariation));
    const discountPercentage = Math.round(template.discountPercentage * (1 + (Math.random() * 0.4 - 0.2))); // Variation in discount
    const priceAfterDiscount = Math.round(basePrice * (1 - (discountPercentage / 100)));
    
    // Small variation in rating
    const ratingVariation = Math.random() * 0.6 - 0.3; // -0.3 to +0.3
    const rating = Math.min(5, Math.max(3.5, template.rating + ratingVariation)).toFixed(1);
    
    // Generate product ID
    const productId = i + 1;
    
    products.push({
      id: `${template.kodePrefix}-${productId.toString().padStart(3, '0')}`,
      name: `${colorVariant} ${template.name} ${modelVariant}`,
      rating: rating,
      price: basePrice.toString(),
      price_after_discount: priceAfterDiscount.toString(),
      discount_percentage: discountPercentage.toString(),
      text_summary: template.text_summary,
      stock: Math.round(template.baseStock * (1 + Math.random() * 0.5 - 0.25)).toString(),
      photos: template.photos,
      description: template.description,
      more_info: template.more_info,
      media_more_info: template.media_more_info,
      category: template.category,
      kode_produk: `${template.kodePrefix}-${productId.toString().padStart(3, '0')}`,
      weight: template.weight,
      size: template.size,
      label_1: template.label_1,
      label_2: i % 5 === 0 ? "New Arrival" : template.label_2
    });
  }
  
  return products;
}

// Generate a large mock dataset
const MOCK_PRODUCTS = generateMockProducts(200);

// Export the MOCK_PRODUCTS for use in other files
export { MOCK_PRODUCTS };

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
        // For mock data, we'll sort by product code (higher codes are "newer")
        filteredProducts.sort((a, b) => {
          const codeA = parseInt(a.kode_produk.split('-')[1] || '0');
          const codeB = parseInt(b.kode_produk.split('-')[1] || '0');
          return codeB - codeA;
        });
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

    // Simulate network delay (smaller delay for better UX with infinite scroll)
    await new Promise(resolve => setTimeout(resolve, 300));

    const response = {
      data: paginatedProducts,
      meta: {
        total: filteredProducts.length,
        page,
        limit,
        total_pages: Math.ceil(filteredProducts.length / limit)
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