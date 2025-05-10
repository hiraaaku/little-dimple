"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormType } from "@/features/auth/schema";
import { useLoginUser, useAuthGuard, useForgotPassword } from "@/features/auth/hooks";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import type { SubmitHandler, Resolver } from "react-hook-form";

export default function LoginPage() {
	const { loading } = useAuthGuard();
	const loginMutation = useLoginUser();
	const forgotPasswordMutation = useForgotPassword();
	const [isRecovering, setIsRecovering] = useState(false);

	const form = useForm<LoginFormType>({
		resolver: zodResolver(loginSchema) as Resolver<LoginFormType>,
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false
		}
	});

	const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
		try {
			await loginMutation.mutateAsync(data);
		} catch {
			toast.error("Login failed. Please check your credentials.");
		}
	};

	const handleForgotPassword = async () => {
		const email = form.getValues("email");
		if (!email) {
			toast.error("Please enter your email address");
			return;
		}

		setIsRecovering(true);
		try {
			await forgotPasswordMutation.mutateAsync(email);
			toast.success("Password recovery instructions sent to your email");
		} catch {
			toast.error("Failed to send recovery email. Please try again.");
		} finally {
			setIsRecovering(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<div className="mb-[1.1rem]">
				<input
					type="email"
					placeholder="Email Address*"
					{...form.register("email")}
					disabled={loginMutation.isPending}
				/>
				{form.formState.errors.email && (
					<p className="text-red-500 font-(family-name:--font-dm-sans) text-sm p-2">
						{form.formState.errors.email.message}
					</p>
				)}
			</div>

			<div className="mb-[1.1rem]">
				<input
					type="password"
					placeholder="Password*"
					{...form.register("password")}
					disabled={loginMutation.isPending}
				/>
				{form.formState.errors.password && (
					<p className="text-red-500 font-(family-name:--font-dm-sans) text-sm p-2">
						{form.formState.errors.password.message}
					</p>
				)}
			</div>

			<div className="font-(family-name:--font-dm-sans) text-(--semiblack-text) flex items-center justify-between mb-[50px]">
				<div className="flex items-center gap-2">
					<input
						type="checkbox"
						{...form.register("rememberMe")}
						disabled={loginMutation.isPending}
					/>
					<span>Remember Me?</span>
				</div>
				<button
					type="button"
					className="transition hover:bg-(--orange-muda) hover:text-black rounded-lg px-2 -mx-2"
					onClick={handleForgotPassword}
					disabled={isRecovering || loginMutation.isPending}
				>
					{isRecovering ? "Sending..." : "Forgot Password?"}
				</button>
			</div>

			<div className="font-(family-name:--font-dm-sans) font-semibold">
				<button
					type="submit"
					className="bg-(--hijau-tua) text-white px-[50px] py-[14px] rounded-[12px] hover:underline transition disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={loginMutation.isPending}
				>
					{loginMutation.isPending ? "Please wait..." : "Login"}
				</button>
				<span className="pl-5 pr-2">Or</span>
				<Link href="/register" className="hover:underline transition">
					Register Here
				</Link>
			</div>
		</form>
	);
}
