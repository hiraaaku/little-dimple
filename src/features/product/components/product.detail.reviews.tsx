import { useGetProductReviews } from "../hooks";
import { ProductReview } from "../types";
import { useState } from "react";

export const ProductDetailReviews = ({ id }: { id: string }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    
    const { data, isLoading, isError } = useGetProductReviews(id, {
        page: currentPage,
        limit: itemsPerPage
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error...</div>;
    }

    const totalItems = data.total || data.data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`size-8 rounded-sm flex items-center justify-center ${
                        currentPage === i
                            ? 'bg-hijau-tua text-white'
                            : 'bg-gray-100 text-black hover:bg-gray-200'
                    }`}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div>
            <h5 className="text-[30px] text-hijau-tua mb-[30px]">Reviews Customer</h5>
            {data.data.map((review: ProductReview, index: number) => (
                <div key={`${review.id}-${index}`}>
                    <ReviewCard {...review} />
                </div>
            ))}
            
            <div className="flex items-center justify-between mt-8">
                <div className="text-neutral-gray">
                    Showing {startIndex}-{endIndex} of {totalItems} Results
                </div>
                <div className="flex items-center gap-2 font-(family-name:--font-dm-sans)">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`size-8 flex items-center justify-center rounded-sm ${
                            currentPage === 1 
                            ? 'bg-gray-200 cursor-not-allowed' 
                            : 'bg-hijau-tua text-white hover:bg-hijau-tua/80'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none" className={currentPage === 1 ? 'text-[#727272]' : 'text-white'}>
                            <path d="M7.1014 1.66675L1.76807 7.00008L7.1014 12.3334" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    
                    {renderPageNumbers()}
                    
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`size-8 flex items-center justify-center rounded-sm ${
                            currentPage === totalPages 
                            ? 'bg-gray-200 cursor-not-allowed' 
                            : 'bg-hijau-tua text-white hover:bg-hijau-tua/80'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none" className={currentPage === totalPages ? 'text-[#727272]' : 'text-white'}>
                            <path d="M1.76872 1.66675L7.10205 7.00008L1.76872 12.3334" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

const ReviewCard = (review: ProductReview) => {
    return (
        <div className="flex flex-wrap gap-[30px] mb-[30px] pb-[30px] border-b border-tertiary-gray">
            <div className="rounded-full shadow-[0_4px_13px_rgba(0,0,0,0.45)] size-[100px] sm:size-[160px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={review.user.avatar} alt={review.user.name} className="size-[100px] sm:size-[160px] object-cover" />
            </div>
            <div className="grow">
                <div className="flex justify-between flex-wrap">
                    <div>
                        <p className="text-[24px] text-hijau-tua inline-block mr-5">{review.user.name}</p>
                        <p className="text-primary font-(family-name:--font-dm-sans) inline-block">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-1 items-center justify-center mb-6">
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={index}
                                className={`w-4 h-4 ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="font-(family-name:--font-dm-sans)">{review.review}</div>
                </div>
            </div>
        </div>
    )
}