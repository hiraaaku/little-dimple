"use client"

import { ProductList } from "@/features/product/components/product.list";
import { useLayoutContext } from "@/providers/index-layout-provider";
import { useEffect } from "react";

export default function ProductIndexPage() {

    const { updateLayout } = useLayoutContext()
    useEffect(() => {
        updateLayout({ title: 'Products', slug: 'shop' })
    }, [])

    return(
        <ProductList />
    )
} 