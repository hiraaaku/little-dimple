"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetProducts } from "../hooks";
import { Product } from "../types";
import { ProductCard } from "./product.card";

export const ProductList = ({ category = "all" }: { category?: string }) => {
    const params = useSearchParams();
    const sortBy = params?.get('sort_by') || 'all';
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState<Product[]>([]);
    const loaderRef = useRef<HTMLDivElement>(null);

    const { data, isLoading, error } = useGetProducts({
        sort_by: sortBy,
        category: category,
        page: page,
        limit: 10,
    });

    useEffect(() => {
        if (data?.data) {
            setProducts(prev => [...prev, ...data.data]);
        }
    }, [data]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading && data?.data?.length > 0) {
                    setPage(prevPage => prevPage + 1);
                }
            },
            { threshold: 0.1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [isLoading, data]);

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="grid grid-cols-3 gap-[26px]">
            {products.length === 0 && !isLoading ? (
                <div className="col-span-3 py-4 text-center">
                    No products available
                </div>
            ) : (
                <>
                    {products.map((product: Product) => (
                        <ProductCard key={product.id}
                            image={product.photos[0].link}
                            title={product.name}
                            price={product.price}
                            discountedPrice={product.price_after_discount}
                            rating={product.rating}
                            href={`/product/detail/${product.id}`}
                        />
                    ))}
                    <div ref={loaderRef} className="col-span-3 py-4 text-center">
                        {isLoading && <div>Loading more products...</div>}
                    </div>
                </>
            )}
        </div>
    );
};