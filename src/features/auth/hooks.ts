import { useMutation } from "@tanstack/react-query";
import { forgotPassword, postLogin } from "./api";
import { useRouter } from "next/navigation";
import type { LoginFormType } from "./schema";
import { useEffect, useState } from "react";
import { isAuthTokenValid } from "./utils";

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
            
            // Redirect to home page
            router.push('/');
        },
    });
}

export const useAuthGuard = (redirectTo: string = "/") => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let mounted = true;
        (async () => {
            const valid = await isAuthTokenValid();
            if (!mounted) return;
            setAuthenticated(valid);
            setLoading(false);
            if (valid) {
                router.replace(redirectTo);
            }
        })();
        return () => { mounted = false; };
    }, [router, redirectTo]);

    return { loading, authenticated };
}

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (email: string) => {
            const response = await forgotPassword(email);
            const data = await response.json();
            return data;
        }
    });
}