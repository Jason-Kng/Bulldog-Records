async function handleResp(response) {
  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const error = new Error(data?.error || `Request failed with status ${response.status}`);

    error.status = response.status;
    throw error;
  }

  return data;
}

export async function getListings() {
  const response = await fetch('api/listing/');


  if (!response.ok) {
    throw new Error("Failed to get listings");
  }

  return handleResp(response);
}

export async function getListing(id) {
  const response = await fetch(`/api/listing/details/${id}`);

  return handleResp(response);

}

export async function searchListings(query) {
  const response = await fetch(`/api/listing/search?query=${encodeURIComponent(query)}`);

  return response.json();
}
