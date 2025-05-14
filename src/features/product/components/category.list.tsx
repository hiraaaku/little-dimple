"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
export const CategoryList = () => {
    const pathname = usePathname();
    const categories = [
        {
            name: "All",
            slug: "all"
        },
        {
            name: "Containers",
            slug: "containers"
        },
        {
            name: "Cooker",
            slug: "cooker"
        },
        {
            name: "Cups & Bottles",
            slug: "cups_bottles"
        },
        {
            name: "Electronic",
            slug: "electronic"
        },
        {
            name: "Feeding Series",
            slug: "feeding_series"
        },
        {
            name: "Newborn Essentials",
            slug: "newborn_essentials"
        },
        {
            name: "non-electronic",
            slug: "non-electronic"
        },
        {
            name: "Uncategorized",
            slug: "uncategorized"
        },
    ]

    return (
        <div className="rounded-lg p-[30px] bg-white shadow-[0_0_60px_rgba(2,2,2,0.07)] mt-[31px]">
            <h3 className="text-secondary font-bold text-[20px] mb-[20px] border-b border-primary pb-[20px] border-dashed">Product Categories</h3>
            <div className="flex flex-col gap-2">
                {categories.map((category, index) => (
                    <Link
                        key={category.slug}
                        href={`/product/category/${category.slug}`}
                        className={`text-neutral-gray font-(family-name:--font-dm-sans) font-medium py-[8px] ${index === categories.length - 1 ? 'border-b-0' : 'border-b'} border-[#E4E4E4] hover:text-primary ${pathname === `/product/category/${category.slug}` ? "text-primary" : ""}`}
                    >{category.name}</Link>
                ))}
            </div>
        </div>
    )
}