import { useMutation, useQuery } from "@tanstack/react-query";
import { addToCart, getCart } from "./api";
import { CartItem } from "./types";

export const useAddToCart = ({onSuccess = () => {}, onError = () => {}}: {onSuccess?: (data: unknown) => void, onError?: (error: Error) => void}) => {
    return useMutation({
        mutationFn: (data: CartItem) => addToCart(data),
        onSuccess: (data) => {
            onSuccess(data);
        },
        onError: (error) => {
            onError(error);
        }
    });
};

export const useGetCart = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
    });
};