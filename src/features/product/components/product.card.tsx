import Link from "next/link"
export const ProductCard = ({
    image,
    title,
    price,
    discountedPrice,
    rating,
    href,
}: { image: string; title: string; price: string; discountedPrice: string; rating: number; href: string }) => {
    return (
        <div className="flex justify-between items-center flex-col border border-[#FCE9DD] rounded-lg p-6 bg-white w-auto text-center">
            <div>
                <div className="w-full aspect-square rounded-[10px] overflow-hidden mb-6 bg-neutral-gray">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover font-(family-name:--font-dm-sans)"
                        loading="lazy"
                    />
                </div>
                <h4 className="text-secondary text-[20px] mb-1">{title}</h4>
                <p className="text-neutral-gray font-(family-name:--font-dm-sans) mb-1">${price} <span className="line-through">${discountedPrice}</span></p>
                <div className="flex gap-1 items-center justify-center mb-6">
                    {[...Array(5)].map((_, index) => (
                        <svg
                            key={index}
                            className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-center gap-2 font-(family-name:--font-dm-sans) text-[14px]">
                <Link href={href} className="bg-neutral-white text-neutral-gray px-4 py-2 rounded-lg hover:bg-neutral-gray hover:text-neutral-white transition-all duration-300">Check More</Link>
                <button className="bg-neutral-white text-neutral-gray px-4 py-2 rounded-lg hover:bg-neutral-gray hover:text-neutral-white transition-all duration-300">Add to Cart</button>
            </div>
        </div>
    )
}