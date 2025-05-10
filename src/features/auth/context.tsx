"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { validateToken } from './api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  // Query to validate token and get user data
  const { isLoading: isTokenValidating } = useQuery<{ user: User }, Error>({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await validateToken(token);
        const data = await response.json();

        if (!response.ok) {
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
        }
        setIsAuthenticated(true);
        setUser(data.user);

        return data as { user: User };
      } catch (error) {
        throw error;
      }
    },
    retry: false,
    refetchOnWindowFocus: true,
  } as UseQueryOptions<{ user: User }, Error>);

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    queryClient.clear();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Consider loading state as true only during initial token validation
  const isLoading = isTokenValidating && !user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 