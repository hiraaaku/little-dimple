"use client";

import BrandLogo from "@/assets/images/brand-logo.png";
import Mail from "@/assets/images/mail.png";
import LocationIcon from "@/assets/images/location.png";
import History from "@/assets/images/history.png";
import Cart from "@/assets/images/cart.png";
import Profile from "@/assets/images/profile.png";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Define menu items
const menuItems = [
	{ name: "Home", path: "/", key: "home" },
	{ name: "Product", path: "/product", key: "product" },
	{ name: "Warranty", path: "/warranty", key: "warranty" },
	{ name: "Dimple Squad", path: "/dimple-squad", key: "dimple-squad" },
	{ name: "Blog", path: "/blog", key: "blog" },
	{ name: "Contact Us", path: "/contact", key: "contact" },
];

export default function MainMenu() {
	const pathname = usePathname();
	const [position, setPosition] = useState<string>(
		menuItems.find((item) => pathname?.includes(item.key))?.key || "home"
	);

	// Update position based on pathname
	useEffect(() => {
		const currentItem = menuItems.find((item) => pathname?.includes(item.key));
		setPosition(currentItem?.key || "home");
	}, [pathname]);

	return (
		<div className="w-full bg-white flex items-center justify-between shadow-[0_4px_9px_rgba(0,0,0,0.25)]">
			<div className="max-w-[1440px] w-full mx-auto tracking-wide">
				{/* Top Info Bar */}
				<div className="font-(family-name:--font-dm-sans) text-white bg-(--hijau-tua) p-[5px] flex flex-wrap items-center justify-end gap-2 sm:gap-16 w-full px-2">
					<InfoItem
						icon={LocationIcon}
						text="Ruko Sunter Permai Blok K2 D7, Sunter Jaya, Tanjung Priok, Jakarta Utara"
					/>
					<InfoItem icon={Mail} text="littledimpleid@gmail.com" isLink />
				</div>

				{/* Navigation */}
				<nav className="flex justify-between items-center px-2 flex-wrap gap-2">
					{/* Logo */}
					<div className="w-full sm:w-auto text-center">
						<Image
							src={BrandLogo}
							alt="Brand Logo"
							width="150"
							className="mx-auto"
						/>
					</div>

					{/* Menu Links */}
					<div className="flex items-center justify-center flex-col sm:flex-row w-full sm:w-auto gap-5 text-[#a5a5a5] text-[18px]">
						{menuItems.map((item) => (
							<Link
								key={item.path}
								href={item.path}
								className={`py-2 px-4 hover:text-black w-full sm:w-auto text-center ${
									position === item.key ? "text-black" : ""
								}`}
							>
								{item.name}
							</Link>
						))}
					</div>

					{/* Placeholder for additional content */}
					<div className="flex items-center justify-center gap-2 w-full sm:w-auto">
						<button
							type="button"
							className="p-5 hover:bg-(--hijau-muda) rounded-lg"
						>
							<Image src={History} alt="history button" height={20} />
						</button>
						<button
							type="button"
							className="p-5 hover:bg-(--hijau-muda) rounded-lg"
						>
							<Image src={Cart} alt="cart button" height={20} />
						</button>
						<button
							type="button"
							className="p-5 hover:bg-(--hijau-muda) rounded-lg"
						>
							<Image src={Profile} alt="profile button" height={20} />
						</button>
					</div>
				</nav>
			</div>
		</div>
	);
}

// InfoItem Component
function InfoItem({
	icon,
	text,
	isLink = false,
}: { icon: StaticImageData; text: string; isLink?: boolean }) {
	return (
		<div className="flex items-center gap-2 w-full sm:w-auto">
			<Image src={icon} alt="icon" height={14} />
			{isLink ? (
				<a href={`mailto:${text}`} className="underline">
					{text}
				</a>
			) : (
				<p>{text}</p>
			)}
		</div>
	);
}
