import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./api";

export const useGetProducts = (params: {
    sort_by?: string;
    category?: string;
    keyword?: string;
    page: number;
    limit: number;
}) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => getProducts(params),
    });
};