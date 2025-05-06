export const metadata = {
	title: "Register - Little Dimple",
	description: "Register Page of Litte Dimple",
};

import Link from "next/link";

export default function RegisterPage() {
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
	return (
		<form>
			<input type="text" placeholder="Username*" className="mb-[1.1rem]" />
			<input
				type="email"
				placeholder="Email Address*"
				className="mb-[1.1rem]"
			/>
			<div className="flex items-center justify-between gap-5 flex-wrap mb-[1.1rem]">
				<select name="gender" className="w-full sm:!max-w-[200px]">
					<option value="">Male</option>
					<option value="">Female</option>
				</select>
				<div className="w-full sm:w-auto flex items-center gap-2 flex-wrap">
					<select name="day">
						<option value="">DD</option>
						{days.map((d) => (
							<option key={d} value={d}>
								{d}
							</option>
						))}
					</select>

					<select name="month">
						<option value="">MM</option>
						{months.map((m, index) => (
							<option key={m} value={index + 1}>
								{m}
							</option>
						))}
					</select>

					<select name="year">
						<option value="">YY</option>
						{years.map((y) => (
							<option key={y} value={y}>
								{y}
							</option>
						))}
					</select>
				</div>
			</div>

			<input type="text" placeholder="Address*" className="mb-[1.1rem]" />
			<div className="font-(family-name:--font-dm-sans) text-(--semiblack-text) flex items-center justify-between mb-[50px]">
				<div className="flex items-center gap-2">
					<input type="checkbox" />
					Remember Me?
				</div>
				<Link
					className="transition hover:bg-(--orange-muda) hover:text-black rounded-lg px-2 -mx-2"
					href={"/forgot-password"}
				>
					Forgot Password?
				</Link>
			</div>
			<div className="font-(family-name:--font-dm-sans) font-semibold">
				<button
					type="submit"
					className="bg-(--hijau-tua) text-white px-[50px] py-[14px] rounded-[12px] hover:underline transition"
				>
					Register
				</button>
			</div>
		</form>
	);
}
