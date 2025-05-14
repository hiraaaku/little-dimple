import Image from "next/image";
import { ReactNode } from "react";
import Gelombang from "@/assets/images/gelombang.png"

export default function IndexLayout({children}: { children: ReactNode}) {
    return(
        <div>
            <div className="h-[386px] bg-(--hijau-tua) relative flex items-center justify-center flex-col p-5 text-white">
                <h3 className="text-[50px]">Products</h3>
                <p className="text-[20px] font-(family-name:--font-dm-sans)">Home / Shop</p>
                <Image
                    className="absolute inset-x-0 bottom-0"
                    src={Gelombang}
                    alt="decoration"
                />
            </div>
            <div>
                { children }
            </div>
        </div>
    )
}