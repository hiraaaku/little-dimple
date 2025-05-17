"use client"
import Image from "next/image";
import { useGetProductDetail } from "../hooks";
import { useRef, useState } from "react";
import Share from "@/assets/images/link-chain.png"
import { HTMLViewer } from "@/shared/components/html-viewer";
import { ProductDetailReviews } from "./product.detail.reviews";
import { DetailBreadcrumb } from "./detail.breadcrumb";

export const ProductDetail = ({ slug }: { slug: string }) => {
    const [moreInfo, setMoreInfo] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { data, isLoading, error } = useGetProductDetail(slug);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (data.message) {
        return <div>Error: {data.message}</div>
    }

    // Function to generate social media sharing URLs
    const generateShareUrls = () => {
        const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
        const title = `Check out ${data.name}`;

        return {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
            youtube: `https://www.youtube.com/share?url=${encodeURIComponent(currentUrl)}`
        };
    };

    const shareUrls = generateShareUrls();

    return (
        <div>
            <DetailBreadcrumb category={data.category} product={data.name} />
            <div className="grid grid-cols-2 gap-[30px]">
                <div className="w-full aspect-square rounded-[10px] overflow-hidden mb-6 bg-neutral-gray">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data.photos[0].link} alt={data.name} className="h-full w-full object-cover font-(family-name:--font-dm-sans)" loading="lazy" />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="mb-[10px] border-b border-[#E4E4E4] pb-[26px]">
                        <div className="flex flex-row gap-2">
                            <h2 className="grow text-[30px] text-(--hijau-tua)">{data.name}</h2>
                            <div className="flex flex-col gap-1 text-[32px] text-primary font-(family-name:--font-urbanist) font-bold">
                                {data.price_after_discount && <p>${data.price_after_discount}</p>}
                                <p className={data.price_after_discount ? "line-through" : ""}>${data.price}</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center justify-start mb-6">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`w-4 h-4 ${index < data.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                    <p className="font-(family-name:--font-dm-sans) text-neutral-gray">{data.text_summary}</p>
                    <p className="font-(family-name:--font-dm-sans) text-primary mb-[30px]">In Stock: {data.stock}</p>
                    <div className="flex flex-row items-center gap-5 mb-5">
                        <span className="text-hijau-tua text-[18px]">Quantity</span>
                        <div className="text-hijau-tua flex flex-row gap-2 border border-tertiary-gray rounded-xl font-[16px] font-(family-name:--font-dm-sans)">
                            <div className="border-r border-tertiary-gray">
                                <button
                                    className="w-10 h-10 hover:bg-tertiary-gray rounded-l-xl m-px"
                                    onClick={() => {
                                        const currentVal = Number(inputRef.current?.value || 0);
                                        if (inputRef.current) {
                                            inputRef.current.value = Math.max(1, currentVal - 1).toString();
                                        }
                                    }}
                                >
                                    -
                                </button>
                            </div>
                            <input
                                type="number"
                                className="w-auto h-10 text-center max-w-[100px] font-bold"
                                ref={inputRef}
                                defaultValue="1"
                                min="1"
                            />
                            <div className="border-l border-tertiary-gray">
                                <button
                                    className="w-10 h-10 hover:bg-tertiary-gray rounded-r-xl m-px"
                                    onClick={() => {
                                        const currentVal = Number(inputRef.current?.value || 0);
                                        if (inputRef.current) {
                                            inputRef.current.value = (currentVal + 1).toString();
                                        }
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 font-(family-name:--font-dm-sans) font-bold">
                        <button className="w-auto bg-primary-ungu text-white py-3 px-10 rounded-xl hover:bg-primary-ungu/80">Add to Cart</button>
                        <button className="w-auto bg-primary-hijau text-white py-3 px-10 rounded-xl hover:bg-primary-hijau/80">Buy Now</button>
                    </div>
                    <div className="mt-6 flex flex-row gap-10">
                        <div className="flex flex-row gap-2 items-center">
                            <span className="block font-(family-name:--font-dm-sans) text-hijau-tua font-medium">Share with friend</span>
                            <Image src={Share} width={24} height={24} alt="share" />

                        </div>
                        <div className="flex flex-row gap-4">
                            <a
                                href={shareUrls.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-1 text-white hover:opacity-80"
                                aria-label="Share on Twitter/X"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#86CCCB">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href={shareUrls.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-1 text-white hover:opacity-80"
                                aria-label="Share on YouTube"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#86CCCB">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                            <a
                                href={shareUrls.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-1 text-white hover:opacity-80"
                                aria-label="Share on Facebook"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#86CCCB">
                                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                                </svg>
                            </a>
                            <a
                                href={shareUrls.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-1 text-white hover:opacity-80"
                                aria-label="Share on LinkedIn"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#86CCCB">
                                    <path d="M6.5 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM11 19h1a1 1 0 0 0 1-1v-4.5c0-1.235.902-2.5 2-2.5a1.5 1.5 0 0 1 1.5 1.5V18a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-5a4 4 0 0 0-4-4c-1.432 0-2.025.534-2.5 1.23V11a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-[30px] pb-[30px] border-b border-tertiary-gray">
                <div className="text-[30px] mb-[15px]">
                    <button className={`inline-block mr-[30px] ${moreInfo ? 'text-hijau-muda hover:underline' : 'text-hijau-tua'}`} onClick={() => setMoreInfo(false)}>Description</button>
                    <button className={`inline-block ${moreInfo ? 'text-hijau-tua' : 'text-hijau-muda hover:underline'}`} onClick={() => setMoreInfo(true)}>More Information</button>
                </div>
                <div className="flex gap-4">
                    <HTMLViewer className="grow" content={moreInfo ? data.more_info : data.description} />
                    {moreInfo && (
                        <video
                            src={data.media_more_info}
                            className="w-full h-full object-cover w-full sm:w-1/3 rounded-xl"
                            controls
                            muted
                            loop
                        />
                    )}
                </div>
            </div>
            <ProductDetailReviews id={slug} />
        </div>
    )
}