"use client"

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FieldInfo from "@/shared/components/field-info";

const registerSchema = z.object({
	username: z.string().min(3, "Username must be at least 3 characters"),
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	dob: z.string().min(1, "Date of birth is required"),
	gender: z.enum(["male", "female"], {
		required_error: "Please select a gender",
	}),
	address: z.string().min(1, "Address is required"),
});

type RegisterFormType = z.infer<typeof registerSchema>;
type Gender = "male" | "female";

export default function RegisterPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const days = Array.from({ length: 31 }, (_, i) => i + 1);
	const months = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];
	const years = Array.from(
		{ length: 100 },
		(_, i) => new Date().getFullYear() - i,
	);

	const handleSubmit = async (values: RegisterFormType) => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Registration failed');
			}

			// Redirect to login page on success
			router.push('/login');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred during registration');
		} finally {
			setIsLoading(false);
		}
	};

	const form = useForm({
		defaultValues: {
			username: '',
			email: '',
			dob: '',
			gender: 'male' as Gender,
			address: '',
		},
		onSubmit: async ({ value }) => {
			await handleSubmit(value as RegisterFormType);
		}
	});

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
				}}
			>
				<div className="mb-[1.1rem]">
					<form.Field
						name="username"
						validators={{
							onChange: ({ value }) => {
								try {
									registerSchema.shape.username.parse(value);
									return undefined;
								} catch (error) {
									return error instanceof z.ZodError ? error.errors[0].message : "Invalid username";
								}
							}
						}}
					>
						{(field) => (
							<>
								<input
									type="text"
									placeholder="Username*"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									disabled={isLoading}
								/>
								<FieldInfo field={field} />
							</>
						)}
					</form.Field>
				</div>

				<div className="mb-[1.1rem]">
					<form.Field
						name="email"
						validators={{
							onChange: ({ value }) => {
								try {
									registerSchema.shape.email.parse(value);
									return undefined;
								} catch (error) {
									return error instanceof z.ZodError ? error.errors[0].message : "Invalid email";
								}
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

				<div className="flex items-start justify-between gap-5 flex-wrap mb-[1.1rem]">
					<form.Field
						name="gender"
						validators={{
							onChange: ({ value }) => {
								try {
									registerSchema.shape.gender.parse(value);
									return undefined;
								} catch (error) {
									return error instanceof z.ZodError ? error.errors[0].message : "Invalid gender";
								}
							}
						}}
					>
						{(field) => (
							<div className="flex flex-col text-left">
								<select
									className="w-full sm:!max-w-[200px] appearance-none bg-[length:20px] bg-[right_8px_center] bg-no-repeat pr-8 bg-[#f8f8f8] border border-[#e2e2e2] rounded-lg"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value as Gender)}
									disabled={isLoading}
								>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>
								<FieldInfo field={field} />
							</div>
						)}
					</form.Field>

					<div className="w-full sm:w-auto flex items-center gap-2 flex-wrap">
						<form.Field
							name="dob"
							validators={{
								onChange: ({ value }) => {
									try {
										registerSchema.shape.dob.parse(value);
										return undefined;
									} catch (error) {
										return error instanceof z.ZodError ? error.errors[0].message : "Invalid date of birth";
									}
								}
							}}
						>
							{(field) => (
								<div className="flex flex-col text-left">
									<div className="flex gap-2">
										<select
											className="csw appearance-none bg-[length:20px] bg-[right_8px_center] bg-no-repeat pr-8 bg-[#f8f8f8] border border-[#e2e2e2] rounded-lg"
											value={field.state.value.split('-')[2] || ''}
											onChange={(e) => {
												const [year, month] = field.state.value.split('-');
												field.handleChange(`${year || new Date().getFullYear()}-${month || '01'}-${e.target.value.padStart(2, '0')}`);
											}}
											disabled={isLoading}
										>
											<option value="">DD</option>
											{days.map((d) => (
												<option key={d} value={d.toString().padStart(2, '0')}>
													{d}
												</option>
											))}
										</select>

										<select
											className="appearance-none bg-[length:20px] bg-[right_8px_center] bg-no-repeat pr-8 bg-[#f8f8f8] border border-[#e2e2e2] rounded-lg"
											value={field.state.value.split('-')[1] || ''}
											onChange={(e) => {
												const [year, , day] = field.state.value.split('-');
												field.handleChange(`${year || new Date().getFullYear()}-${e.target.value}-${day || '01'}`);
											}}
											disabled={isLoading}
										>
											<option value="">MM</option>
											{months.map((m, index) => (
												<option key={m} value={(index + 1).toString().padStart(2, '0')}>
													{m}
												</option>
											))}
										</select>

										<select
											className="appearance-none bg-[length:20px] bg-[right_8px_center] bg-no-repeat pr-8 bg-[#f8f8f8] border border-[#e2e2e2] rounded-lg"
											value={field.state.value.split('-')[0] || ''}
											onChange={(e) => {
												const [, month, day] = field.state.value.split('-');
												field.handleChange(`${e.target.value}-${month || '01'}-${day || '01'}`);
											}}
											disabled={isLoading}
										>
											<option value="">YYYY</option>
											{years.map((y) => (
												<option key={y} value={y}>
													{y}
												</option>
											))}
										</select>
									</div>
									<FieldInfo field={field} />
								</div>
							)}
						</form.Field>
					</div>
				</div>

				<div className="mb-[1.1rem]">
					<form.Field
						name="address"
						validators={{
							onChange: ({ value }) => {
								try {
									registerSchema.shape.address.parse(value);
									return undefined;
								} catch (error) {
									return error instanceof z.ZodError ? error.errors[0].message : "Invalid address";
								}
							}
						}}
					>
						{(field) => (
							<>
								<textarea
									placeholder="Address*"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									disabled={isLoading}
									rows={3}
									className="w-full"
								/>
								<FieldInfo field={field} />
							</>
						)}
					</form.Field>
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
								{isSubmitting || isLoading ? "Please wait..." : "Register"}
							</button>
						)}
					</form.Subscribe>
				</div>
			</form>
		</>
	);
}
