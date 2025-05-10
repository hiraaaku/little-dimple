"use client"

import Image from "next/image";
import LoginRegisterAssets from "@/assets/images/login_register_asset.png";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./auth.module.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/features/auth/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			router.push('/');
		}
	}, [isLoading, isAuthenticated, router]);

	if (isLoading || isAuthenticated) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center py-10 px-5 my-10">
			<div className="grid sm:grid-cols-2 w-full">
				<div className="flex items-center justify-center h-full">
					<Image
						src={LoginRegisterAssets}
						alt="Litte Dimple Login/Register"
						width={496}
					/>
				</div>
				<div className={styles.wrapper}>
					<div className={styles.container}>
						<div className="text-[30px] mb-8">
							<Link
								className={`${pathname === "/login" ? 'text-(--hijau-tua)' : 'text-(--hijau-muda)'} hover:underline transition`}
								href={"/login"}
							>
								Login
							</Link>
							<span className="px-[10px] text-(--hijau-tua)">|</span>
							<Link
								className={`${pathname === "/register" ? 'text-(--hijau-tua)' : 'text-(--hijau-muda)'} hover:underline transition`}
								href={"/register"}
							>
								Register
							</Link>
						</div>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
