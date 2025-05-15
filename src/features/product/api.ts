export const getProducts = async (params: {
    sort_by?: string;
    category?: string;
    keyword?: string;
    page?: number;
    limit?: number;
}) => {
    const { sort_by, category, keyword, page, limit } = params;
    const url = new URL('/api/product', 'http://localhost:3000');

    if (sort_by) {
        url.searchParams.set('sort_by', sort_by);
    }

    if (category) {
        url.searchParams.set('category', category);
    }

    if (keyword) {
        url.searchParams.set('keyword', keyword);
    }

    if (page) {
        url.searchParams.set('page', page.toString());
    }

    if (limit) {
        url.searchParams.set('limit', limit.toString());
    }

    const response = await fetch(url.toString());
    const data = await response.json();
    return data;
};
