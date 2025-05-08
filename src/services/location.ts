interface Location {
	id: string;
	name: string;
}

// Dummy data for provinces
export const provinces: Location[] = [
	{ id: "1", name: "DKI Jakarta" },
	{ id: "2", name: "Jawa Barat" },
	{ id: "3", name: "Jawa Tengah" },
	{ id: "4", name: "Jawa Timur" },
	{ id: "5", name: "DI Yogyakarta" },
];

// Dummy data for cities
export const cities: Record<string, Location[]> = {
	"1": [ // DKI Jakarta
		{ id: "1", name: "Jakarta Pusat" },
		{ id: "2", name: "Jakarta Utara" },
		{ id: "3", name: "Jakarta Barat" },
		{ id: "4", name: "Jakarta Selatan" },
		{ id: "5", name: "Jakarta Timur" },
	],
	"2": [ // Jawa Barat
		{ id: "6", name: "Bandung" },
		{ id: "7", name: "Bogor" },
		{ id: "8", name: "Depok" },
		{ id: "9", name: "Bekasi" },
		{ id: "10", name: "Cimahi" },
	],
	// Add more cities for other provinces...
};

// Dummy data for subdistricts
export const subdistricts: Record<string, Location[]> = {
	"1": [ // Jakarta Pusat
		{ id: "1", name: "Gambir" },
		{ id: "2", name: "Tanah Abang" },
		{ id: "3", name: "Menteng" },
	],
	"2": [ // Jakarta Utara
		{ id: "4", name: "Tanjung Priok" },
		{ id: "5", name: "Pademangan" },
		{ id: "6", name: "Penjaringan" },
	],
	// Add more subdistricts for other cities...
};

export const getProvinces = async () => {
	// Simulate API call delay
	await new Promise(resolve => setTimeout(resolve, 500));
	return provinces;
};

export const getCities = async (provinceId: string) => {
	// Simulate API call delay
	await new Promise(resolve => setTimeout(resolve, 500));
	return cities[provinceId] || [];
};

export const getSubdistricts = async (cityId: string) => {
	// Simulate API call delay
	await new Promise(resolve => setTimeout(resolve, 500));
	return subdistricts[cityId] || [];
}; 