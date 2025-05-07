import Image from "next/image";
import BGFooter from "@/assets/images/bg-footer.png";
import BrandLogo from "@/assets/images/brand-logo.png";
import LocationIcon from "@/assets/images/loc-icon.png";
import MailIcon from "@/assets/images/email-icon.png";
import TelpIcon from "@/assets/images/telp-icon.png";
import WaIcon from "@/assets/images/wa.png";
import IgIcon from "@/assets/images/ig.png";
import TokpedIcon from "@/assets/images/tokped.png";
import ShopeeIcon from "@/assets/images/shopee.png";
import Link from "next/link";
import BCAIcon from "@/assets/images/bca.png";
import BRIVAIcon from "@/assets/images/briva.png";
import MandiriIcon from "@/assets/images/mandiri.png";
import GopayIcon from "@/assets/images/gopay.png";
import PermataIcon from "@/assets/images/permata.png";
import QRISIcon from "@/assets/images/qris.png";
import MobilFooter from "@/assets/images/mobil-footer.png";
import StarFooter from "@/assets/images/star-footer.png";
import PesawatFooter from "@/assets/images/pesawat-footer.png";
import KuasFooter from "@/assets/images/kuas-footer.png";

export const Footer = () => {
	return <div className="relative">
        <Image src={BGFooter} alt="background footer" className="w-full h-full absolute inset-0 z-0" />
        <Image src={MobilFooter} height={90} alt="mobil decoration" className="hidden md:block absolute top-35 left-20" />
        <Image src={StarFooter} height={60} alt="star decoration" className="hidden md:block absolute bottom-30 left-10" />
        <Image src={PesawatFooter} height={90} alt="pesawat decoration" className="hidden md:block absolute top-35 right-20" />
        <Image src={KuasFooter} height={130} alt="kuas decoration" className="hidden md:block absolute bottom-30 right-10" />
        <div className="max-w-[1050px] mx-auto px-5 sm:px-0 z-10 pb-4 relative pt-30 flex justify-between flex-wrap gap-10 border-b border-white/30">
            <div className="font-(family-name:--font-dm-sans) text-white sm:max-w-[300px] grow">
                <Image src={BrandLogo} alt="brand logo" height={100} className="mx-auto" />
                <div className="flex items-center gap-5 mb-4">
                    <Image
                        src={LocationIcon}
                        alt="location icon"
                        width={20}
                        height={20}
                    />
                    <p>Ruko Sunter Permai Blok K2 D7, Sunter Jaya, Tanjung Priok, Jakarta Utara</p>
                </div>
                <div className="flex items-center gap-5 mb-4">
                    <Image
                        src={TelpIcon}
                        alt="telephone icon"
                        width={20}
                        height={20}
                    />
                    <p>(+62) 821 2266 8696</p>
                </div>
                <div className="flex items-center gap-5 mb-4">
                    <Image
                        src={MailIcon}
                        alt="location icon"
                        width={20}
                        height={20}
                    />
                    <a href="mailto:littledimpleid@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:underline">littledimpleid@gmail.com</a>
                </div>
                <div className="flex items-center gap-5 py-3">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:shadow-lg transition-all duration-300">
                        <Image
                            src={WaIcon}
                            alt="whatsapp icon"
                            width={32}
                            height={32}
                        />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:shadow-lg transition-all duration-300">
                        <Image
                            src={IgIcon}
                            alt="instagram icon"
                            width={32}
                            height={32}
                        />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:shadow-lg transition-all duration-300">
                        <Image
                            src={TokpedIcon}
                            alt="tokopedia icon"
                            width={32}
                            height={32}
                        />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:shadow-lg transition-all duration-300">
                        <Image
                            src={ShopeeIcon}
                            alt="shopee icon"
                            width={32}
                            height={32}
                        />
                    </a>
                </div>
            </div>
            <div className="flex gap-14 flex-wrap">
                <div className="text-white w-full sm:w-auto">
                    <h3 className="text-[24px] mb-5">Explore</h3>
                    <ul className="font-(family-name:--font-dm-sans) text-[16px]">
                        <li className="px-3 py-2 -ml-3 hover:bg-white/10 transition-all duration-300">
                            <Link href={'/product'} className="w-full hover:underline block">Products</Link>
                        </li>
                        <li className="px-3 py-2 -ml-3 hover:bg-white/10 transition-all duration-300">
                            <Link href={'/blog'} className="w-full hover:underline block">Blog</Link>
                        </li>
                        <li className="px-3 py-2 -ml-3 hover:bg-white/10 transition-all duration-300">
                            <Link href={'/contact'} className="w-full hover:underline block">Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <div className="text-white w-full sm:w-auto">
                    <h3 className="text-[24px] mb-5">Available Payment Options</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="size-[76px] flex items-center justify-center rounded-lg bg-white hover:shadow-lg transition-all duration-300"><Image src={BCAIcon} alt="bca icon" width={64} /></div>
                        <div className="size-[76px] flex items-center justify-center rounded-lg bg-white hover:shadow-lg transition-all duration-300"><Image src={BRIVAIcon} alt="briva icon" width={64} /></div>
                        <div className="size-[76px] flex items-center justify-center rounded-lg bg-white hover:shadow-lg transition-all duration-300"><Image src={GopayIcon} alt="gopay icon" width={64} /></div>
                        <div className="size-[76px] flex items-center justify-center rounded-lg bg-white hover:shadow-lg transition-all duration-300"><Image src={MandiriIcon} alt="mandiri icon" width={64} /></div>
                        <div className="size-[76px] flex items-center justify-center rounded-lg bg-white hover:shadow-lg transition-all duration-300"><Image src={PermataIcon} alt="permata icon" width={64} /></div>
                        <div className="size-[76px] flex items-center justify-center rounded-lg bg-white hover:shadow-lg transition-all duration-300"><Image src={QRISIcon} alt="qris icon" width={64} /></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="max-w-[1050px] mx-auto px-2 z-10 relative">
            <p className="text-white text-center font-(family-name:--font-dm-sans) text-[16px] p-5 pb-7">Copyright © 2025. All rights reserved.</p>
        </div>
    </div>;
};
