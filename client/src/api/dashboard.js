export async function getListings() {
  const response = await fetch('api/listing/');


  if (!response.ok) {
    throw new Error("Failed to get listings");
  }

  return response.json();
}

export async function getListing(id) {
  console.log("ID: ", id);
  const response = await fetch(`/api/listing/details/${id}`);
  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to get listing details");
  }

  return response.json();

}
