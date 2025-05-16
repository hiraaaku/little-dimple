export type Product = {
    id: string;
    photos: Array<{link: string}>;
    name: string;
    rating: number;
    price: string;
    price_after_discount: string;
    discount_percentage: string;
    text_summary: string;
    stock: string;
    description: string;
    more_info: string;
    media_more_info: string;
    category: string;
    kode_produk: string;
    weight: string;
    size: string;
    label_1: string;
    label_2: string;
};

export type ProductReview = {
    id: string;
    review: string;
    rating: number;
    user: {
        name: string;
        avatar: string;
    };
    createdAt: string;
};
