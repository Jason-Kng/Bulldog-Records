export async function getListings() {
  const response = await fetch('api/listing/');


  if (!response.ok) {
    throw new Error("Failed to get listings");
  }

  return response.json();
}
