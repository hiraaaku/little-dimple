import Link from "next/link"
import { useRouter } from "next/navigation";
import ArrowLeft from "@/assets/images/arrow_left.png"
import Image from "next/image";

export const DetailBreadcrumb = ({ category, product }: { category: string, product: string }) => {
    const router = useRouter();
    return (
        <div className="flex items-center font-(family-name:--font-dm-sans) gap-2 py-10">
            <button className="size-[44px] bg-white rounded-full flex items-center justify-center shadow-[0_1px_18px_rgba(0,0,0,0.12)] shadow-[0_3px_5px_rgba(0,0,0,0.20)] mr-[20px]" onClick={() => router.back()}>
                <Image src={ArrowLeft} alt="arrow-left" className="size-6" />
            </button>
            <Link href="/product" className="capitalize hover:underline">Product</Link>
            <span className="mx-2">&gt;</span>
            <Link href="/product" className="capitalize hover:underline">{category.replace(/[-_]/g, ' ')}</Link>
            <span className="mx-2">&gt;</span>
            <Link href={`product/detail/${product}`} className="capitalize hover:underline">{product}</Link>
        </div>
    )
}