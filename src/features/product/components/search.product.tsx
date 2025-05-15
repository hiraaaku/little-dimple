"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import search from "@/assets/images/search-icon.png"

export const SearchProduct = () => {
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (inputValue) {
                const url = new URL(window.location.href);
                url.searchParams.set('search', inputValue);
                window.history.pushState({}, '', url);
            }
        }, 500)

        return () => clearTimeout(delayDebounce)
    }, [inputValue])

    return (
        <div className="flex items-center gap-2 border border-primary rounded-lg px-5 py-2">
            <button 
                className="bg-transparent"
                onClick={() => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('search', inputValue);
                    window.history.pushState({}, '', url);
                }}
            >
                <Image src={search} alt="search" width={20} height={20} />
            </button>
            <input 
                className="font-(family-name:--font-dm-sans) text-primary p-3 w-full" 
                type="text" 
                placeholder="Search" 
                onChange={e => setInputValue(e.target.value)} 
            />
        </div>
    )
}