"use client"

/* eslint-disable react/no-children-prop */
import FieldInfo from "@/shared/components/field-info";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	password: z.string(),
	rememberMe: z.boolean().default(false)
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type LoginFormType = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (values: LoginFormType) => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: values.email,
					password: values.password,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Login failed');
			}

			// Handle remember me
			if (values.rememberMe) {
				localStorage.setItem('auth_token', data.token);
				localStorage.setItem('user', JSON.stringify(data.user));
			} else {
				sessionStorage.setItem('auth_token', data.token);
				sessionStorage.setItem('user', JSON.stringify(data.user));
			}

			// Redirect to dashboard or home
			router.push('/');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred during login');
		} finally {
			setIsLoading(false);
		}
	};

	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		onSubmit: async ({ value }) => {
			await handleSubmit(value);
		}
	});

	const handleForgotPassword = async () => {
		if (!form.state.values.email) {
			setError('Please enter your email address first');
			return;
		}

		try {
			setIsLoading(true);
			setError(null);

			const response = await fetch('/api/auth/forgot-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: form.state.values.email,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Failed to send reset password email');
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 font-(family-name:--font-dm-sans)" role="alert">
					<span className="block sm:inline">{error}</span>
				</div>
			)}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					void form.handleSubmit();
				}}>
				<div
					className="mb-[1.1rem]">
					<form.Field
						name="email"
						validators={{
							onChange: ({ value }) => {
								const result = loginSchema.shape.email.safeParse(value);
								return result.success ? undefined : result.error.errors[0].message;
							}
						}}
					>
						{(field) => (
							<>
								<input
									type="email"
									placeholder="Email Address*"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									disabled={isLoading}
								/>
								<FieldInfo field={field} />
							</>
						)}
					</form.Field>
				</div>
				<div
					className="mb-[1.1rem]">
					<form.Field
						name="password"
						validators={{
							onChange: ({ value }) => {
								const result = loginSchema.shape.password.safeParse(value);
								return result.success ? undefined : result.error.errors[0].message;
							}
						}}
					>
						{(field) => (
							<>
								<input
									type="password"
									placeholder="Password*"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									disabled={isLoading}
								/>
								<FieldInfo field={field} />
							</>
						)}
					</form.Field>
				</div>
				<div className="font-(family-name:--font-dm-sans) text-(--semiblack-text) flex items-center justify-between mb-[50px]">
					<form.Field
						name="rememberMe"
					>
						{(field) => (
							<div className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={field.state.value}
									onChange={(e) => field.handleChange(e.target.checked)}
									disabled={isLoading}
								/>
								Remember Me?
							</div>
						)}
					</form.Field>
					<button
						type="button"
						className="transition hover:bg-(--orange-muda) hover:text-black rounded-lg px-2 -mx-2"
						onClick={handleForgotPassword}
						disabled={isLoading}
					>
						Forgot Password?
					</button>
				</div>
				<div className="font-(family-name:--font-dm-sans) font-semibold">
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
					>
						{([canSubmit, isSubmitting]) => (
							<button
								type="submit"
								className="bg-(--hijau-tua) text-white px-[50px] py-[14px] rounded-[12px] hover:underline transition disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={!canSubmit || isLoading}
							>
								{isSubmitting || isLoading ? "Please wait..." : "Login"}
							</button>
						)}
					</form.Subscribe>
					<span className="pl-5 pr-2">Or</span>
					<Link href={"/register"} className="hover:underline transition">
						Register Here
					</Link>
				</div>
			</form>
		</>
	);
}
