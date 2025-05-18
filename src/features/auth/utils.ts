import { redirect } from "next/navigation";
import { validateToken } from "./api";
import { toast } from "sonner";

export const getAuthToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
};

export const isAuthTokenValid = async (): Promise<boolean> => {
    const token = getAuthToken();
    if (!token) return false;
    try {
        const res = await validateToken(token);
        if (!res.ok) return false;
        const data = await res.json();
        return data.valid === true;
    } catch {
        return false;
    }
};

export const isAuthenticated = async () => {
    return await isAuthTokenValid();
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    console.log('fetchWithAuth', url, options);
    const token = getAuthToken();
    if (!token) {
        if (typeof window !== 'undefined') {
            toast.error('Session expired, please login again');
            window.location.href = '/login';
        } else {
            redirect('/login');
        }
        throw new Error('No auth token');
    }

    // Add authorization header
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    console.log('headers', headers);

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        // If unauthorized, try to refresh token
        if (response.status === 401) {
            const isValid = await isAuthTokenValid();
            if (!isValid) {
                // Token is invalid, redirect to login
                window.location.href = '/login';
                throw new Error('Session expired');
            }
        }

        return response;
    } catch (error) {
        throw error;
    }
}; 