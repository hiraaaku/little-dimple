export const postLogin = async ({ email, password }: { email: string, password: string }) => fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email,
        password: password,
    }),
});

export const validateToken = async (token: string) => fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/validate-token`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ auth_token: token }),
});

export const forgotPassword = async (email: string) => fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/forgot-password`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email,
    }),
});