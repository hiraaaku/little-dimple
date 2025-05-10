import { validateToken } from "./api";

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