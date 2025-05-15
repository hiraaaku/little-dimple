import { ProductList } from "@/features/product/components/product.list";
import { Suspense } from "react";

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductList category={slug} />
        </Suspense>
    )
} 