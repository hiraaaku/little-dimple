import { NextResponse } from 'next/server';

// Dummy data for cities (in a real app, this would come from a database)
const CITIES: Record<string, { id: string; name: string }[]> = {
    "31": [ // DKI Jakarta
        { id: "3171", name: "Jakarta Selatan" },
        { id: "3172", name: "Jakarta Timur" },
        { id: "3173", name: "Jakarta Pusat" },
        { id: "3174", name: "Jakarta Barat" },
        { id: "3175", name: "Jakarta Utara" },
    ],
    "32": [ // Jawa Barat
        { id: "3201", name: "Kabupaten Bogor" },
        { id: "3202", name: "Kabupaten Sukabumi" },
        { id: "3203", name: "Kabupaten Cianjur" },
        { id: "3204", name: "Kabupaten Bandung" },
        { id: "3205", name: "Kabupaten Garut" },
        { id: "3206", name: "Kabupaten Tasikmalaya" },
        { id: "3207", name: "Kabupaten Ciamis" },
        { id: "3208", name: "Kabupaten Kuningan" },
        { id: "3209", name: "Kabupaten Cirebon" },
        { id: "3210", name: "Kabupaten Majalengka" },
        { id: "3211", name: "Kabupaten Sumedang" },
        { id: "3212", name: "Kabupaten Indramayu" },
        { id: "3213", name: "Kabupaten Subang" },
        { id: "3214", name: "Kabupaten Purwakarta" },
        { id: "3215", name: "Kabupaten Karawang" },
        { id: "3216", name: "Kabupaten Bekasi" },
        { id: "3217", name: "Kabupaten Bandung Barat" },
        { id: "3218", name: "Kabupaten Pangandaran" },
        { id: "3271", name: "Kota Bogor" },
        { id: "3272", name: "Kota Sukabumi" },
        { id: "3273", name: "Kota Bandung" },
        { id: "3274", name: "Kota Cirebon" },
        { id: "3275", name: "Kota Bekasi" },
        { id: "3276", name: "Kota Depok" },
        { id: "3277", name: "Kota Cimahi" },
        { id: "3278", name: "Kota Tasikmalaya" },
        { id: "3279", name: "Kota Banjar" },
    ],
    "33": [ // Jawa Tengah
        { id: "3301", name: "Kabupaten Cilacap" },
        { id: "3302", name: "Kabupaten Banyumas" },
        { id: "3303", name: "Kabupaten Purbalingga" },
        { id: "3304", name: "Kabupaten Banjarnegara" },
        { id: "3305", name: "Kabupaten Kebumen" },
        { id: "3306", name: "Kabupaten Purworejo" },
        { id: "3307", name: "Kabupaten Wonosobo" },
        { id: "3308", name: "Kabupaten Magelang" },
        { id: "3309", name: "Kabupaten Boyolali" },
        { id: "3310", name: "Kabupaten Klaten" },
        { id: "3311", name: "Kabupaten Sukoharjo" },
        { id: "3312", name: "Kabupaten Wonogiri" },
        { id: "3313", name: "Kabupaten Karanganyar" },
        { id: "3314", name: "Kabupaten Sragen" },
        { id: "3315", name: "Kabupaten Grobogan" },
        { id: "3316", name: "Kabupaten Blora" },
        { id: "3317", name: "Kabupaten Rembang" },
        { id: "3318", name: "Kabupaten Pati" },
        { id: "3319", name: "Kabupaten Kudus" },
        { id: "3320", name: "Kabupaten Jepara" },
        { id: "3321", name: "Kabupaten Demak" },
        { id: "3322", name: "Kabupaten Semarang" },
        { id: "3323", name: "Kabupaten Temanggung" },
        { id: "3324", name: "Kabupaten Kendal" },
        { id: "3325", name: "Kabupaten Batang" },
        { id: "3326", name: "Kabupaten Pekalongan" },
        { id: "3327", name: "Kabupaten Pemalang" },
        { id: "3328", name: "Kabupaten Tegal" },
        { id: "3329", name: "Kabupaten Brebes" },
        { id: "3371", name: "Kota Magelang" },
        { id: "3372", name: "Kota Surakarta" },
        { id: "3373", name: "Kota Salatiga" },
        { id: "3374", name: "Kota Semarang" },
        { id: "3375", name: "Kota Pekalongan" },
        { id: "3376", name: "Kota Tegal" },
    ],
};

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const provinceId = searchParams.get('province_id');

        if (!provinceId) {
            return NextResponse.json(
                { message: 'Province ID is required' },
                { status: 400 }
            );
        }

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const cities = CITIES[provinceId] || [];
        return NextResponse.json(cities);
    } catch (error) {
        console.error('Error fetching cities:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
} 