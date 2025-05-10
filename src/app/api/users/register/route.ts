import { NextResponse } from 'next/server';
import { z } from 'zod';

const registerSchema = z.object({
	username: z.string().min(3, "Username must be at least 3 characters"),
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	full_name: z.string().min(1, "Full name is required"),
	dob: z.string().min(1, "Date of birth is required"),
	phone: z.string().min(1, "Phone number is required"),
	address: z.string().min(1, "Address is required"),
	province_id: z.string().min(1, "Province ID is required"),
	province_name: z.string().min(1, "Province name is required"),
	city_id: z.string().min(1, "City ID is required"),
	city_name: z.string().min(1, "City name is required"),
	subdistrict_id: z.string().min(1, "Subdistrict ID is required"),
	subdistrict_name: z.string().min(1, "Subdistrict name is required"),
});

// Dummy user storage (in a real app, this would be a database)
const DUMMY_USERS: z.infer<typeof registerSchema>[] = [];

export async function POST(request: Request) {
	try {
		const body = await request.json();

		// Validate request body
		const validationResult = registerSchema.safeParse(body);
		if (!validationResult.success) {
			return NextResponse.json(
				{ message: validationResult.error.errors[0].message },
				{ status: 400 }
			);
		}

		// Simulate network delay
		await new Promise(resolve => setTimeout(resolve, 1000));

		// Check if email already exists
		const existingUser = DUMMY_USERS.find(u => u.email === body.email);
		if (existingUser) {
			return NextResponse.json(
				{ message: 'Email already exists' },
				{ status: 400 }
			);
		}

		// Store user (in a real app, this would hash the password and store in a database)
		DUMMY_USERS.push(body);

		// Success response
		return NextResponse.json({
			message: 'User registered successfully',
			user: {
				username: body.username,
				email: body.email,
				full_name: body.full_name,
			}
		}, { status: 201 });
	} catch {
		return NextResponse.json(
			{ message: 'Server error' },
			{ status: 500 }
		);
	}
} 