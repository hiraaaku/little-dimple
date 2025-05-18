import { useGetCart } from "../hooks";
import { CartItem } from "../types";
import { ProductCard } from "./product.card"

export const CartPopup = () => {
    const { data: cartItems, isLoading, isError, error } = useGetCart();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            {cartItems.data
                ? cartItems.data.map((item: CartItem) => (
                    <ProductCard key={item.id} data={item} quantity={item.quantity} />
                ))
                : <div>No items in cart</div>
            }
        </div>
    )
}