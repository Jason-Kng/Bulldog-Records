import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getActiveUsers, updateUserStatus } from "../../api/adminApi";
import "./admin.css";
import "../seller/seller.css";

function ManageUsersPage() {
  const [sellers, setSellers] = useState(null);
  const [buyers, setBuyers] = useState(null);
  const navigate = useNavigate();

  function loadUsers() {
    getActiveUsers()
      .then((data) => {
        setSellers(data.sellers);
        setBuyers(data.buyers);
      })
      .catch((err) => alert(err.message));
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function changeStatus(type, id, status) {
    updateUserStatus(type, id, status)
      .then(() => loadUsers())
      .catch((err) => alert(err.message));
  }

  if (!sellers || !buyers) {
    return <h3>Retrieving Users...</h3>;
  }

  return (
    <div className="listings-container">
      <h2>Manage Users</h2>

      <div className="listings-buttons-container">
        <button
          type="button"
          className="seller-view-listings-button"
          onClick={() => navigate("/admin")}
        >
          My Dashboard
        </button>
      </div>
      
      

      <div className="seller-listings-divider">
        <ul>
          <h3>Sellers</h3>
          {sellers.map((seller) => (
            <li key={seller.id} className={`listings-container-li ${seller.accountStatus} ${seller.approvalStatus}`}>
              <p className="listing-page-title">{seller.name}</p>
              <p className="listing-page-stock">{seller.email}</p>
              <p className={`listing-page-status ${seller.accountStatus}`}>Account Status: {seller.accountStatus}</p>
              <p className={`users-page-status ${seller.approvalStatus}`}>{seller.approvalStatus}</p>
              <div className="users-buttons-container">
     
                {seller.accountStatus === "active" ? (
                  <button
                  type="button"
                  className="manage-users-button" 
                  onClick={() => changeStatus("seller", seller.id, "deactivated")}>
                    Deactivate
                  </button>
                ) : (
                  <button 
                  type="button"
                  className="manage-users-button"
                  onClick={() => changeStatus("seller", seller.id, "active")}>
                    Activate
                  </button>
                )}
                
                </div>
            </li>
          ))}
        </ul>

        <ul>
          <h3>Buyers</h3>
          {buyers.map((buyer) => (
            <li key={buyer.id} className={`listings-container-li ${buyer.accountStatus}`}>
              
                <div>
                <p className="listing-page-title">{buyer.name}</p>
                <p className="listing-page-stock">{buyer.email}</p>
                <p className={`listing-page-status ${buyer.accountStatus}`}>Account Status: {buyer.accountStatus}</p>

                <div className="users-buttons-container">
     
                  {buyer.accountStatus === "active" ? (
                    <button
                    type="button"
                    className="manage-users-button" 
                    onClick={() => changeStatus("buyer", buyer.id, "deactivated")}>
                      Deactivate
                    </button>
                  ) : (
                    <button 
                    type="button"
                    className="manage-users-button"
                    onClick={() => changeStatus("buyer", buyer.id, "active")}>
                      Activate
                    </button>
                  )}
                
                </div>


              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManageUsersPage;