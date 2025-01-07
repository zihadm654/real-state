"use server";

export async function getLocation(location: string) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
    );
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }
}
