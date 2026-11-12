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