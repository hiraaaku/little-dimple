import { ProductDetail } from "@/features/product/components/product.detail";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <div className="max-w-[1280px] mx-auto px-1 sm:px-5 py-5 mb-24">
            <ProductDetail slug={slug} />
        </div>
    )
}