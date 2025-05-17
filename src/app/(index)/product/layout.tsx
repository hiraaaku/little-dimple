import { SearchProduct } from "@/features/product/components/search.product";
import { CategoryList } from "@/features/product/components/category.list";
import { SortListSelect } from "@/features/product/components/sort.list.select";

export const metadata = {
    title: 'Products - Little Dimple`',
    description: 'Products',
}

export default async function ProductLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return(
        <div className="max-w-[1280px] mx-auto grid grid-cols-4 gap-[26px] p-5 my-24">
            <div>
                <SearchProduct />
                <CategoryList />
            </div>
            <div className="col-span-3">
                <div className="flex items-center justify-between pb-[31px]">
                    <h3 className="text-[26px] font-bold text-neutral-gray">Shop</h3>
                    <SortListSelect />
                </div>
                <div className="">
                    {children}
                </div>
            </div>
        </div>
    )
} 