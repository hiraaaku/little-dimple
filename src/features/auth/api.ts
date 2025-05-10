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

export const postRegister = async (data: {
    username: string;
    email: string;
    password: string;
    full_name: string;
    dob: string;
    phone: string;
    address: string;
    province_id: string;
    province_name: string;
    city_id: string;
    city_name: string;
    subdistrict_id: string;
    subdistrict_name: string;
}) => fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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

// Location APIs
export const getProvinces = async () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/provinces`).then(res => res.json());

export const getCities = async (provinceId: string) => 
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/cities?province_id=${provinceId}`).then(res => res.json());

export const getSubdistricts = async (cityId: string) => 
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/subdistricts?city_id=${cityId}`).then(res => res.json());