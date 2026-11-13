async function handleResp(response) {
  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const error = new Error(
      data?.error ||
      data?.message ||
      `Request failed with status ${response.status}`
    );

    error.status = response.status;
    throw error;
  }

  return data;
}

export async function getListings() {
  const response = await fetch('/api/listing/');


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

  return handleResp(response);
}

export async function getSuggestions(id) {
  const response = await fetch(`/api/listing/${id}/suggest`);

  return handleResp(response);
}

export async function getOrder(id) {
  const response = await fetch(`/api/orders/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  });

  const data = await handleResp(response);
  // console.log(data);

  const groupedOrders = Object.values(
    data.reduce((acc, item) => {
      if (!acc[item.orderID]) {
        acc[item.orderID] = {
          orderID: item.orderID,
          dateCreated: item.dateCreated,
          dateShipped: item.dateShipped,
          orderTotalCost: item.orderTotalCost,
          orderStatus: item.orderStatus,
          items: []
        };
      }

      acc[item.orderID].items.push({
        listingID: item.listingID,
        title: item.title,
        artist: item.artist,
        photo: item.photo,
        sellerName: item.sellerName,
        price: item.price,
        quantity: item.itemQuantity,
        orderItemID: item.orderItemID,
        orderItemStatus: item.orderItemStatus
      });

      return acc;
    }, {})
  );

  return groupedOrders;
}

export async function getOrders() {
  const response = await fetch('/api/orders/', {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  });

  const data = await handleResp(response);

  const groupedOrders = Object.values(
    data.reduce((acc, item) => {
      if (!acc[item.orderID]) {
        acc[item.orderID] = {
          orderID: item.orderID,
          dateCreated: item.dateCreated,
          dateShipped: item.dateShipped,
          orderTotalCost: item.orderTotalCost,
          orderStatus: item.orderStatus,
          items: []
        };
      }

      acc[item.orderID].items.push({
        listingID: item.listingID,
        title: item.title,
        artist: item.artist,
        photo: item.photo,
        sellerName: item.sellerName,
        orderItemID: item.orderItemID
      });

      return acc;
    }, {})
  );

  return groupedOrders;

}

export async function postReturn(returnObj) {
  const response = await fetch('/api/returns/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(returnObj),
  });

  const data = await handleResp(response);

  return data;
}



