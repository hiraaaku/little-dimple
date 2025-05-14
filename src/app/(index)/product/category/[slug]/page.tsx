export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { slug } = await params;
    const { search } = await searchParams;
    const searchValue = typeof search === 'string' ? search : '';

    return (
        <div className="">
            <p>{searchValue}</p>
            <p>{slug}</p>
        </div>
    )
} 