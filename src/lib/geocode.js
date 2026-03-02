// PATH: /lib/geocode.js

const cache = {};

export async function geocodeCity(cityName) {
  const normalized = cityName.trim();

  if (cache[normalized]) return cache[normalized];

  const query = `${normalized}, Ontario, Canada`;
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=ca`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "FridmarLaw/1.0 (lawfirm website geocoding)",
      },
      next: { revalidate: 604800 },
    });

    if (!res.ok) return null;

    const data = await res.json();

    if (!data || data.length === 0) return null;

    const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    cache[normalized] = coords;
    return coords;
  } catch (err) {
    console.warn(`[geocode] Failed to geocode "${normalized}":`, err.message);
    return null;
  }
}

export async function geocodeAllCities(regions) {
  const allCities = new Set();

  for (const region of regions) {
    for (const group of region.groups ?? []) {
      const cities = group.cities?.split(",") ?? [];
      for (const city of cities) {
        const trimmed = city.trim();
        if (trimmed) allCities.add(trimmed);
      }
    }
  }

  const entries = await Promise.all(
    [...allCities].map(async (city) => {
      const coords = await geocodeCity(city);
      return [city, coords];
    }),
  );

  return Object.fromEntries(entries.filter(([, coords]) => coords !== null));
}
