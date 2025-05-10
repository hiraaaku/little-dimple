import { NextResponse } from 'next/server';
import { z } from 'zod';

const registerSchema = z.object({
	username: z.string().min(3, "Username must be at least 3 characters"),
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	dob: z.string().min(1, "Date of birth is required"),
	gender: z.enum(["male", "female"], {
		required_error: "Please select a gender",
	}),
	address: z.string().min(1, "Address is required"),
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

		// Check if user already exists
		const existingUser = DUMMY_USERS.find(u => u.email === body.email || u.username === body.username);
		if (existingUser) {
			return NextResponse.json(
				{ message: 'User with this email or username already exists' },
				{ status: 409 }
			);
		}

		// Store user (in a real app, this would hash the password and store in a database)
		DUMMY_USERS.push(body);

		// Success response
		return NextResponse.json({
			message: 'Registration successful',
			user: {
				username: body.username,
				email: body.email,
			}
		});
	} catch (error) {
		console.error('register error:', error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
} 