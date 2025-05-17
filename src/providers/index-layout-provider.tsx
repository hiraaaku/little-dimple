'use client'

import { createContext, useContext, useState } from 'react'
import Gelombang from "@/assets/images/gelombang.png"
import Image from 'next/image'

type LayoutData = {
    title: string
    slug: string
}

type LayoutContextType = {
    data: LayoutData
    updateLayout: (newData: LayoutData) => void
}

const LayoutContext = createContext<LayoutContextType>({
    data: { title: '', slug: '' },
    updateLayout: () => { },
})

export const useLayoutContext = () => useContext(LayoutContext)

export function IndexLayoutProvider({
    children,
    value,
}: {
    children: React.ReactNode
    value: LayoutData
}) {
    const [layoutData, setLayoutData] = useState<LayoutData>(value)

    const updateLayout = (newData: LayoutData) => {
        setLayoutData(newData)
    }

    return (
        <LayoutContext.Provider value={{ data: layoutData, updateLayout }}>
            <div className="relative">
                <IndexLayoutComponent data={layoutData} />
                {children}
            </div>
        </LayoutContext.Provider>
    )
}

const IndexLayoutComponent = ({ data }: { data: LayoutData }) => {
    return (
        <div className="h-[386px] bg-(--hijau-tua) relative flex items-center justify-center flex-col p-5 text-white">
            <h3 className="text-[50px]">{data.title}</h3>
            <p className="text-[20px] font-(family-name:--font-dm-sans) capitalize">Home / {data.slug}</p>
            <Image
                className="absolute inset-x-0 bottom-0"
                src={Gelombang}
                alt="decoration"
            />
        </div>
    )
}