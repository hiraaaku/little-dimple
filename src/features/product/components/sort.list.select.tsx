"use client"

import { useRouter, useSearchParams } from "next/navigation"

export const SortListSelect = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams?.toString() || "")
        params.set("sort_by", e.target.value)
        router.push(`?${params.toString()}`)
    }

    return (
        <select 
            className="text-neutral-gray p-5 font-(family-name:--font-dm-sans) font-bold max-w-[18rem] w-full"
            value={searchParams?.get("sort_by") || "newest"}
            onChange={handleChange}
        >
            <option value="popular">Sort by Popularity</option>
            <option value="newest">Sort by Newest</option>
            <option value="price low to high">Sort by Price Low to High</option>
            <option value="price high to low">Sort by Price High to Low</option>
        </select>
    )
}