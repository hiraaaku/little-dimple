import { NextResponse } from 'next/server';

// Dummy data for subdistricts
const SUBDISTRICTS: Record<string, Array<{ id: string; name: string }>> = {
	// Jakarta Selatan (3171)
	'3171': [
		{ id: '317101', name: 'Tebet' },
		{ id: '317102', name: 'Setiabudi' },
		{ id: '317103', name: 'Mampang Prapatan' },
		{ id: '317104', name: 'Pancoran' },
		{ id: '317105', name: 'Jagakarsa' },
		{ id: '317106', name: 'Pasar Minggu' },
		{ id: '317107', name: 'Kebayoran Lama' },
		{ id: '317108', name: 'Kebayoran Baru' },
		{ id: '317109', name: 'Cilandak' },
		{ id: '317110', name: 'Pancoran' }
	],
	// Kota Bandung (3273)
	'3273': [
		{ id: '327301', name: 'Andir' },
		{ id: '327302', name: 'Astanaanyar' },
		{ id: '327303', name: 'Antapani' },
		{ id: '327304', name: 'Arcamanik' },
		{ id: '327305', name: 'Babakan Ciparay' },
		{ id: '327306', name: 'Bandung Kidul' },
		{ id: '327307', name: 'Bandung Kulon' },
		{ id: '327308', name: 'Bandung Wetan' },
		{ id: '327309', name: 'Batununggal' },
		{ id: '327310', name: 'Bojongloa Kaler' },
		{ id: '327311', name: 'Bojongloa Kidul' },
		{ id: '327312', name: 'Buahbatu' },
		{ id: '327313', name: 'Cibeunying Kaler' },
		{ id: '327314', name: 'Cibeunying Kidul' },
		{ id: '327315', name: 'Cibiru' },
		{ id: '327316', name: 'Cicendo' },
		{ id: '327317', name: 'Cidadap' },
		{ id: '327318', name: 'Cinambo' },
		{ id: '327319', name: 'Coblong' },
		{ id: '327320', name: 'Gedebage' },
		{ id: '327321', name: 'Kiaracondong' },
		{ id: '327322', name: 'Lengkong' },
		{ id: '327323', name: 'Mandalajati' },
		{ id: '327324', name: 'Panyileukan' },
		{ id: '327325', name: 'Rancasari' },
		{ id: '327326', name: 'Regol' },
		{ id: '327327', name: 'Sukajadi' },
		{ id: '327328', name: 'Sukasari' },
		{ id: '327329', name: 'Sumur Bandung' },
		{ id: '327330', name: 'Ujungberung' }
	]
};

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const cityId = searchParams.get('city_id');

		if (!cityId) {
			return NextResponse.json(
				{ message: 'City ID is required' },
				{ status: 400 }
			);
		}

		// Simulate network delay
		await new Promise(resolve => setTimeout(resolve, 500));

		const subdistricts = SUBDISTRICTS[cityId] || [];

		return NextResponse.json(subdistricts);
	} catch (error) {
		console.error('Error in subdistricts API:', error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
} 