import Link from "next/link";

export const metadata = {
    title: 'Login - Little Dimple',
    description: 'Login Page of Litte Dimple',
  };

export default function LoginPage() {
	return (
		<form>
			<input
				type="text"
				placeholder="User Name or  Email Address*"
				className="mb-[1.1rem]"
			/>
			<input type="password" placeholder="Password*" className="mb-[1.5rem]" />
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
					Login
				</button>
				<span className="pl-5 pr-2">Or</span>
				<Link href={"/register"} className="hover:underline transition">
					Register Here
				</Link>
			</div>
		</form>
	);
}
