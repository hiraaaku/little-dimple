import { useGetProductReviews } from "../hooks";
import { ProductReview } from "../types";

export const ProductDetailReviews = ({ id }: { id: string }) => {
    const { data, isLoading, isError } = useGetProductReviews(id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error...</div>;
    }

    return (
        <div>
            <h5 className="text-[30px] text-hijau-tua mb-[30px]">Reviews Customer</h5>
            {data.data.map((review: ProductReview, index: number) => (
                <div key={`${review.id}-${index}`}>
                    <ReviewCard {...review} />
                </div>
            ))}
        </div>
    )
}

const ReviewCard = (review: ProductReview) => {
    return (
        <div className="flex gap-[30px] mb-[30px] pb-[30px] border-b border-tertiary-gray">
            <div className="rounded-full shadow-[0_4px_13px_rgba(0,0,0,0.45)] size-[160px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={review.user.avatar} alt={review.user.name} className="size-[160px] object-cover" />
            </div>
            <div className="grow">
                <div className="flex justify-between">
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