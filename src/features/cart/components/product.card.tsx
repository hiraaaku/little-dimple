import { QuantityControl } from "@/features/product/components/quantity.control"
import { CartItem } from "../types"
import { useRef } from "react";

export const ProductCard = ({
    data,
    quantity,
}: {
    data: CartItem,
    quantity: number,
}) => {
    const quantityRef = useRef<HTMLInputElement>(null);
    const removeItem = () => {
        console.log('removing items')
    }
    return (
        <div className="flex gap-5 mb-7 border-b border-[#D3D3D3] pb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.media_link} alt={data.product_name} className="object-cover w-[77px] h-[77px] rounded-[5px] bg-gray-100" loading="lazy" />
            <div className="w-full">
                <h1 className="text-[20px] mb-2">{data.product_name}</h1>
                <QuantityControl ref={quantityRef} defaultValue={quantity} />
                <p className="mb-2 font-(family-name:--font-dm-sans) text-[16px] font-semibold">Rp {data.price.toLocaleString('id-ID')}</p>
            </div>
            <button 
                className='w-[50px] h-[34px] rounded-full bg-white flex items-center justify-center border' 
                onClick={removeItem}
            >
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.8 14.75L3.75 13.7L7.95 9.5L3.75 5.3L4.8 4.25L9 8.45L13.2 4.25L14.25 5.3L10.05 9.5L14.25 13.7L13.2 14.75L9 10.55L4.8 14.75Z" fill="black" />
                </svg>
            </button>
        </div>
    )
}