"use client"

import { useForm } from "@tanstack/react-form";
import { useState, useEffect } from "react";
import FieldInfo from "@/shared/components/field-info";
import { registerSchema, type RegisterFormType } from "@/features/auth/schema";
import { getProvinces, getCities, getSubdistricts } from "@/features/auth/api";
import { useRegisterUser } from "@/features/auth/hooks";
import { z } from "zod";
import CustomSelect, { SelectOption } from "@/shared/components/custom-select";
import { toast } from "sonner";
import { CSSObjectWithLabel } from "react-select";

type Location = {
	id: string;
	name: string;
};

const customStyles = {
	control: (base: CSSObjectWithLabel) => ({
		...base,
		backgroundColor: 'var(--gray-bg)',
		borderColor: '#e2e2e2',
		borderRadius: '0.5rem',
		minHeight: '38px',
		boxShadow: '0 2px 8px #00000040',
		fontFamily: 'var(--font-dm-sans)',
		fontWeight: 'normal',
		color: 'var(--semiblack-text)',
		padding: '.8rem .8rem .8rem 1.5rem',
		'&:hover': {
			borderColor: '#e2e2e2'
		},
		'&:focus-within': {
			borderColor: '#e2e2e2',
			boxShadow: 'none'
		}
	}),
	option: (base: CSSObjectWithLabel) => ({
		...base,
		fontFamily: 'var(--font-dm-sans)',
		fontWeight: 'normal',
		padding: '.8rem .8rem .8rem 1.5rem',
	}),
	menu: (base: CSSObjectWithLabel) => ({
		...base,
		backgroundColor: 'var(--gray-bg)',
		minHeight: '38px',
		boxShadow: 'none',
	}),
}

export default function RegisterPage() {
	const [error, setError] = useState<string | null>(null);
	const [provinces, setProvinces] = useState<Location[]>([]);
	const [cities, setCities] = useState<Location[]>([]);
	const [subdistricts, setSubdistricts] = useState<Location[]>([]);
	const [currentYear, setCurrentYear] = useState<number>(0);
	const [isLoadingLocations, setIsLoadingLocations] = useState(true);

	const registerMutation = useRegisterUser();

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
		(_, i) => currentYear - i,
	);

	// Load provinces and set current year on component mount
	useEffect(() => {
		const loadProvinces = async () => {
			try {
				setIsLoadingLocations(true);
				const data = await getProvinces();
				setProvinces(data);
			} catch {
				toast.error('Failed to load provinces');
			} finally {
				setIsLoadingLocations(false);
			}
		};
		setCurrentYear(new Date().getFullYear());
		loadProvinces();
	}, []);

	const handleSubmit = async (values: RegisterFormType) => {
		try {
			setError(null);
			await registerMutation.mutateAsync(values);
			toast.success('Registration successful!');
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'An error occurred during registration';
			setError(errorMessage);
			toast.error(errorMessage);
		}
	};

	const form = useForm({
		defaultValues: {
			username: '',
			email: '',
			password: '',
			full_name: '',
			dob: '',
			phone: '',
			address: '',
			province_id: '',
			province_name: '',
			city_id: '',
			city_name: '',
			subdistrict_id: '',
			subdistrict_name: '',
		},
		onSubmit: async ({ value }) => {
			await handleSubmit(value as RegisterFormType);
		}
	});

	// Handle province selection
	const handleProvinceChange = async (selectedOption: SelectOption | null) => {
		if (selectedOption) {
			form.setFieldValue('province_id', selectedOption.value);
			form.setFieldValue('province_name', selectedOption.label);
			form.setFieldValue('city_id', '');
			form.setFieldValue('city_name', '');
			form.setFieldValue('subdistrict_id', '');
			form.setFieldValue('subdistrict_name', '');
			setCities([]);
			setSubdistricts([]);

			try {
				const data = await getCities(selectedOption.value);
				setCities(data);
			} catch {
				toast.error('Failed to load cities');
			}
		} else {
			form.setFieldValue('province_id', '');
			form.setFieldValue('province_name', '');
			form.setFieldValue('city_id', '');
			form.setFieldValue('city_name', '');
			form.setFieldValue('subdistrict_id', '');
			form.setFieldValue('subdistrict_name', '');
			setCities([]);
			setSubdistricts([]);
		}
	};

	// Handle city selection
	const handleCityChange = async (selectedOption: SelectOption | null) => {
		if (selectedOption) {
			form.setFieldValue('city_id', selectedOption.value);
			form.setFieldValue('city_name', selectedOption.label);
			form.setFieldValue('subdistrict_id', '');
			form.setFieldValue('subdistrict_name', '');
			setSubdistricts([]);

			try {
				const data = await getSubdistricts(selectedOption.value);
				setSubdistricts(data);
			} catch {
				toast.error('Failed to load subdistricts');
			}
		} else {
			form.setFieldValue('city_id', '');
			form.setFieldValue('city_name', '');
			form.setFieldValue('subdistrict_id', '');
			form.setFieldValue('subdistrict_name', '');
			setSubdistricts([]);
		}
	};

	// Handle subdistrict selection
	const handleSubdistrictChange = (selectedOption: SelectOption | null) => {
		if (selectedOption) {
			form.setFieldValue('subdistrict_id', selectedOption.value);
			form.setFieldValue('subdistrict_name', selectedOption.label);
		} else {
			form.setFieldValue('subdistrict_id', '');
			form.setFieldValue('subdistrict_name', '');
		}
	};

	// Convert locations to select options
	const provinceOptions: SelectOption[] = provinces.map(province => ({
		value: province.id,
		label: province.name
	}));

	const cityOptions: SelectOption[] = cities.map(city => ({
		value: city.id,
		label: city.name
	}));

	const subdistrictOptions: SelectOption[] = subdistricts.map(subdistrict => ({
		value: subdistrict.id,
		label: subdistrict.name
	}));

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
									if (error instanceof z.ZodError) {
										return error.errors[0].message;
									}
									return "Invalid username";
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
									disabled={registerMutation.isPending}
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
									if (error instanceof z.ZodError) {
										return error.errors[0].message;
									}
									return "Invalid email";
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
									disabled={registerMutation.isPending}
								/>
								<FieldInfo field={field} />
							</>
						)}
					</form.Field>
				</div>

				<div className="mb-[1.1rem]">
					<form.Field
						name="password"
						validators={{
							onChange: ({ value }) => {
								try {
									registerSchema.shape.password.parse(value);
									return undefined;
								} catch (error) {
									if (error instanceof z.ZodError) {
										return error.errors[0].message;
									}
									return "Invalid password";
								}
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
									disabled={registerMutation.isPending}
								/>
								<FieldInfo field={field} />
							</>
						)}
					</form.Field>
				</div>

				<div className="mb-[1.1rem]">
					<form.Field
						name="full_name"
						validators={{
							onChange: ({ value }) => {
								try {
									registerSchema.shape.full_name.parse(value);
									return undefined;
								} catch (error) {
									if (error instanceof z.ZodError) {
										return error.errors[0].message;
									}
									return "Invalid full name";
								}
							}
						}}
					>
						{(field) => (
							<>
								<input
									type="text"
									placeholder="Full Name*"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									disabled={registerMutation.isPending}
								/>
								<FieldInfo field={field} />
							</>
						)}
					</form.Field>
				</div>

				<div className="mb-[1.1rem]">
					<form.Field
						name="phone"
						validators={{
							onChange: ({ value }) => {
								try {
									registerSchema.shape.phone.parse(value);
									return undefined;
								} catch (error) {
									if (error instanceof z.ZodError) {
										return error.errors[0].message;
									}
									return "Invalid phone number";
								}
							}
						}}
					>
						{(field) => (
							<>
								<input
									type="tel"
									placeholder="Phone Number*"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									disabled={registerMutation.isPending}
								/>
								<FieldInfo field={field} />
							</>
						)}
					</form.Field>
				</div>

				<div className="mb-[1.1rem]">
					<form.Field
						name="dob"
						validators={{
							onChange: ({ value }) => {
								try {
									registerSchema.shape.dob.parse(value);
									return undefined;
								} catch (error) {
									if (error instanceof z.ZodError) {
										return error.errors[0].message;
									}
									return "Invalid date of birth";
								}
							}
						}}
					>
						{(field) => (
							<>
								<div className="w-full grid grid-cols-3 gap-2">
									<select
										className="csw appearance-none bg-[length:20px] bg-[right_8px_center] bg-no-repeat pr-8 bg-[#f8f8f8] border border-[#e2e2e2] rounded-lg"
										value={field.state.value.split('-')[2] || ''}
										onChange={(e) => {
											const [year, month] = field.state.value.split('-');
											field.handleChange(`${year || currentYear}-${month || '01'}-${e.target.value.padStart(2, '0')}`);
										}}
										disabled={registerMutation.isPending}
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
											field.handleChange(`${year || currentYear}-${e.target.value}-${day || '01'}`);
										}}
										disabled={registerMutation.isPending}
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
										disabled={registerMutation.isPending}
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
							</>
						)}
					</form.Field>
				</div>

				<div className="mb-[1.1rem]">
					<form.Field
						name="province_id"
						validators={{
							onChange: ({ value }) => {
								try {
									registerSchema.shape.province_id.parse(value);
									return undefined;
								} catch (error) {
									if (error instanceof z.ZodError) {
										return error.errors[0].message;
									}
									return "Invalid province";
								}
							}
						}}
					>
						{(field) => (
							<>
								{isLoadingLocations ? (
									<div className="h-[38px] bg-[#f8f8f8] border border-[#e2e2e2] rounded-lg animate-pulse" />
								) : (
									<CustomSelect
										options={provinceOptions}
										value={provinceOptions.find(option => option.value === field.state.value) || null}
										onChange={handleProvinceChange}
										placeholder="Select Province*"
										isDisabled={registerMutation.isPending}
										noOptionsMessage={() => "No provinces found"}
										styles={customStyles}
										invertStyles={true}
									/>
								)}
								<FieldInfo field={field} />
							</>
						)}
					</form.Field>
				</div>

				<div className="mb-[1.1rem]">
					<form.Field
						name="city_id"
						validators={{
							onChange: ({ value }) => {
								try {
									registerSchema.shape.city_id.parse(value);
									return undefined;
								} catch (error) {
									if (error instanceof z.ZodError) {
										return error.errors[0].message;
									}
									return "Invalid city";
								}
							}
						}}
					>
						{(field) => (
							<>
								{isLoadingLocations ? (
									<div className="h-[38px] bg-[#f8f8f8] border border-[#e2e2e2] rounded-lg animate-pulse" />
								) : (
									<CustomSelect
										options={cityOptions}
										value={cityOptions.find(option => option.value === field.state.value) || null}
										onChange={handleCityChange}
										placeholder="Select City*"
										isDisabled={registerMutation.isPending || !form.getFieldValue('province_id')}
										noOptionsMessage={() => "No cities found"}
										styles={customStyles}
										invertStyles={true}
									/>
								)}
								<FieldInfo field={field} />
							</>
						)}
					</form.Field>
				</div>

				<div className="mb-[1.1rem]">
					<form.Field
						name="subdistrict_id"
						validators={{
							onChange: ({ value }) => {
								try {
									registerSchema.shape.subdistrict_id.parse(value);
									return undefined;
								} catch (error) {
									if (error instanceof z.ZodError) {
										return error.errors[0].message;
									}
									return "Invalid subdistrict";
								}
							}
						}}
					>
						{(field) => (
							<>
								{isLoadingLocations ? (
									<div className="h-[38px] bg-[#f8f8f8] border border-[#e2e2e2] rounded-lg animate-pulse" />
								) : (
									<CustomSelect
										options={subdistrictOptions}
										value={subdistrictOptions.find(option => option.value === field.state.value) || null}
										onChange={handleSubdistrictChange}
										placeholder="Select Subdistrict*"
										isDisabled={registerMutation.isPending || !form.getFieldValue('city_id')}
										noOptionsMessage={() => "No subdistricts found"}
										styles={customStyles}
										invertStyles={true}
									/>
								)}
								<FieldInfo field={field} />
							</>
						)}
					</form.Field>
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
									if (error instanceof z.ZodError) {
										return error.errors[0].message;
									}
									return "Invalid address";
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
									disabled={registerMutation.isPending}
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
								disabled={!canSubmit || registerMutation.isPending}
							>
								{isSubmitting || registerMutation.isPending ? "Please wait..." : "Register"}
							</button>
						)}
					</form.Subscribe>
				</div>
			</form>
		</>
	);
}
