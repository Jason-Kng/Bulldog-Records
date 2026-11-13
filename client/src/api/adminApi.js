// admin: manage users
function authHeaders() {
  return { Authorization: "Bearer " + localStorage.getItem("accessToken") };
}

export async function getActiveUsers() {
  return fetch("/api/admin/users", { headers: authHeaders() }).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to load users");
    }

    return data;
  });
}

export async function updateUserStatus(type, id, status) {
  return fetch(`/api/admin/users/${type}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ status }),
  }).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to update user");
    }

    return data;
  });
}

export async function getActiveListings() {
  return fetch("/api/admin/manage-listings", { headers: authHeaders() }).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to load listings");
    }

    return data;
  });
}

export async function updateListingStatus(id, status) {
  return fetch(`/api/admin/manage-listings/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ status }),
  }).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to update listing");
    }

    return data;
  });
}

export async function getAdminListing(id) {
  return fetch(`/api/admin/manage-listings/${id}`, { headers: authHeaders() }).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to load listing");
    }

    return data;
  });
}

export async function getAdminOrders() {
  return fetch("/api/admin/orders", { headers: authHeaders() }).then((res) => res.json());
}

export async function getAdminOrder(id) {
  return fetch(`/api/admin/orders/${id}`, { headers: authHeaders() }).then((res) => res.json());
}

export async function cancelOrder(id) {
    const response = await fetch(`/api/admin/orders/${id}/cancel`, {
        method: "PATCH",
        headers: authHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to cancel order");
    }

    return data;
}
