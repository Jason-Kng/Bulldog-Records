// add  logged-in user's token to every request
function authHeaders() {
  return { Authorization: "Bearer " + localStorage.getItem("accessToken") };
}

// export function getSeller() {
//   return fetch("/api/seller", { headers: authHeaders() }).then((res) => res.json());
// }

export async function getSellerAccountInfo() {
  return fetch("/api/seller", { headers: authHeaders() }).then((res) => res.json());
}

export async function getListings() {
  return fetch("/api/seller/listings", { headers: authHeaders() }).then((res) => res.json());
}

export async function getListing(id) {
  return fetch(`/api/seller/listings/${id}`, { headers: authHeaders() }).then((res) => res.json());
}

export async function addListing(listing) {
  const formData = new FormData();

  formData.append("title", listing.title);
  formData.append("artist", listing.artist);
  formData.append("releaseDate", listing.releaseDate);
  formData.append("mediaType", listing.mediaType);
  formData.append("genre", listing.genre);
  formData.append("EAN", listing.EAN);
  formData.append("condition", listing.condition);
  formData.append("stock", listing.stock);
  formData.append("price", listing.price);

  if (listing.photo) {
    formData.append("photo", listing.photo);
  }

  return fetch("/api/seller/listings", {
    method: "POST",
    headers: { ...authHeaders() },
    // convert listing into json, need for post and put
    body: formData,
  }).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to create listing");
    }

    return data;
  });
}
export async function updateListing(id, listing) {
  const formData = new FormData();

  formData.append("title", listing.title);
  formData.append("artist", listing.artist);
  formData.append("releaseDate", listing.releaseDate);
  formData.append("mediaType", listing.mediaType);
  formData.append("genre", listing.genre);
  formData.append("EAN", listing.EAN);
  formData.append("condition", listing.condition);
  formData.append("stock", listing.stock);
  formData.append("price", listing.price);

  if (listing.photo) {
    formData.append("photo", listing.photo);
  }

  return fetch(`/api/seller/listings/${id}`, {
    method: "PUT",
    headers: { ...authHeaders() },
    body: formData,
  }).then((res) => res.json());
}


export async function removeListing(id) {
  return fetch(`/api/seller/listings/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then((res) => res.json());
}

// orders
export async function getOrders() {
  return fetch("/api/seller/orders", { headers: authHeaders() }).then((res) => res.json());
}

export async function getOrder(id) {
  return fetch(`/api/seller/orders/${id}`, { headers: authHeaders() }).then((res) => res.json());
}

export async function getOrderDetails(id) {
  return fetch(`/api/seller/orders/details/${id}`, { headers: authHeaders() }).then((res) => res.json());
}

export async function getReturns() {
  return fetch("/api/seller/returns", { headers: authHeaders() }).then((res) => res.json());
}

export async function getFinancial() {
  return fetch("/api/seller/financial", { headers: authHeaders() }).then((res) => res.json());
}

