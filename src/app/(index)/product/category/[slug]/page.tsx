/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductCard } from "@/features/product/components/product.card";
import { ProductList } from "@/features/product/components/product.list";

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
        <ProductList category={slug} />
    )
} 