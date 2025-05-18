import { fetchWithAuth } from "../auth/utils";
import { CartItem } from "./types";

export const addToCart = async ({product_name, price, quantity, media_link}: CartItem) => {
    const url = new URL(`/api/cart/me`, process.env.NEXT_PUBLIC_API_URL);
    const response = await fetchWithAuth(url.toString(), {
        method: 'POST',
        body: JSON.stringify({
            product_name,
            price,
            quantity,
            media_link,
        }),
    });
    const data = await response.json();
    return data;
};

export const getCart = async () => {
    const url = new URL(`/api/cart/me`, process.env.NEXT_PUBLIC_API_URL);
    const response = await fetchWithAuth(url.toString(), {
        method: 'GET',
    });
    const data = await response.json();
    return data;
};