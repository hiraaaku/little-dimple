import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgotPassword, postLogin, postRegister } from "./api";
import { useRouter } from "next/navigation";
import type { LoginFormType, RegisterFormType } from "./schema";
import { useAuth } from "./context";

interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const useLoginUser = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    
    return useMutation<LoginResponse, Error, LoginFormType>({
        mutationFn: async (credentials) => {
            const response = await postLogin(credentials);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            
            return data as LoginResponse;
        },
        onSuccess: (data) => {
            // Store auth data in storage
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Invalidate and refetch auth query
            queryClient.invalidateQueries({ queryKey: ['auth'] });
            
            // Redirect to home page
            router.push('/');
        },
    });
}

export const useRegisterUser = () => {
    const router = useRouter();
    
    return useMutation<unknown, Error, RegisterFormType>({
        mutationFn: async (data) => {
            const response = await postRegister(data);
            const responseData = await response.json();
            
            if (!response.ok) {
                throw new Error(responseData.message || 'Registration failed');
            }
            
            return responseData;
        },
        onSuccess: () => {
            router.push('/login');
        },
    });
}

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (email: string) => {
            const response = await forgotPassword(email);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to process forgot password request');
            }
            
            return data;
        }
    });
}

export const useLogout = () => {
    const { logout } = useAuth();
    const router = useRouter();
    
    return () => {
        logout();
        router.push('/login');
    };
}