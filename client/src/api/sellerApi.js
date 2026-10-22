// add  logged-in user's token to every request
function authHeaders() {
  return { Authorization: "Bearer " + localStorage.getItem("accessToken") };
}

export function getSeller() {
  return fetch("/api/seller", { headers: authHeaders() }).then((res) => res.json());
}

export function getListings() {
  return fetch("/api/seller/listings", { headers: authHeaders() }).then((res) => res.json());
}

export function getListing(id) {
  return fetch(`/api/seller/listings/${id}`, { headers: authHeaders() }).then((res) => res.json());
}

export function addListing(listing) {
  return fetch("/api/seller/listings", {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    // convert listing into json, need for post and put
    body: JSON.stringify(listing),
  }).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to create listing");
    }

    return data;
  });
}
export function updateListing(id, listing) {
  return fetch(`/api/seller/listings/${id}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(listing),
  }).then((res) => res.json());
}


export function removeListing(id) {
  return fetch(`/api/seller/listings/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
   }).then((res) => res.json());
}