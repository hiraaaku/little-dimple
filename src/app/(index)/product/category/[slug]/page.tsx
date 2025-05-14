/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductCard } from "@/features/product/components/product.card";

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { slug } = await params;
    const { search } = await searchParams;
    const searchValue = typeof search === 'string' ? search : '';

    return (
        <div className="">
            <div className="grid grid-cols-3 gap-[26px]">
                <ProductCard
                    image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                    title="Product Title"
                    price="100"
                    discountedPrice="80"
                    rating={4.5}
                    href="/product/detail/1"
                />
                <ProductCard
                    image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                    title="Product Title"
                    price="100"
                    discountedPrice="80"
                    rating={4.5}
                    href="/product/detail/1"
                />
                <ProductCard
                    image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                    title="Product Title"
                    price="100"
                    discountedPrice="80"
                    rating={4.5}
                    href="/product/detail/1"
                />
                <ProductCard
                    image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                    title="Product Title"
                    price="100"
                    discountedPrice="20"
                    rating={4.5}
                    href="/product/detail/1"
                />
                <ProductCard
                    image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                    title="Product Title"
                    price="100"
                    discountedPrice="20"
                    rating={4.5}
                    href="/product/detail/1"
                />
                <ProductCard
                    image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                    title="Product Title"
                    price="100"
                    discountedPrice="20"
                    rating={3}
                    href="/product/detail/1"
                />
            </div>
        </div>
    )
} 