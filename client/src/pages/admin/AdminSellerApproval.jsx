import { useEffect, useState } from 'react';

export default function AdminSellerApprovals({ token }) {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [updatingID, setUpdatingID] = useState(null);

    const apiURL = 'http://localhost:3000/api/admin';

    async function loadPendingSellers() {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(
                `${apiURL}/sellers/pending`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(
                    response.status === 401
                        ? 'Please log in again.'
                        : response.status === 403
                            ? 'Administrator access is required.'
                            : `Failed to load sellers (${response.status}).`
                );
            }

            const data = await response.json();
            setSellers(data);
        } catch (err) {
            setError(err.message || 'Could not connect to the server.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (token) {
            loadPendingSellers();
        } else {
            setLoading(false);
            setError('Please log in as an administrator.');
        }
    }, [token]);

    async function updateSeller(sellerID, approvalStatus) {
        setUpdatingID(sellerID);
        setError('');
        setMessage('');

        try {
            const response = await fetch(
                `${apiURL}/sellers/${sellerID}/status`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ approvalStatus })
                }
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.error || `Update failed (${response.status}).`
                );
            }

            setSellers(current =>
                current.filter(seller => seller.sellerID !== sellerID)
            );

            setMessage(
                `Seller ${sellerID} was ${approvalStatus} successfully.`
            );
        } catch (err) {
            setError(err.message || 'Could not update seller.');
        } finally {
            setUpdatingID(null);
        }
    }

    if (loading) {
        return <p>Loading pending sellers...</p>;
    }

    return (
        <main className="admin-approvals">
            <h1>Seller Approvals</h1>

            {error && <p role="alert">{error}</p>}
            {message && <p role="status">{message}</p>}

            <button onClick={loadPendingSellers}>
                Refresh list
            </button>

            {!error && sellers.length ===0 && (
                <p>There are no sellers waiting for approval.</p>
            )}

            {sellers.map(seller => (
                <section
                    key={seller.sellerID}
                    className="seller-card"
                >
                    <h2>{seller.name}</h2>
                    <p>Email: {seller.email}</p>
                    <p>Seller ID: {seller.sellerID}</p>
                    <p>Status: {seller.approvalStatus}</p>

                    <button
                        disabled={updatingID !== null}
                        onClick={() =>
                            updateSeller(seller.sellerID, 'approved')
                        }
                    >
                        {updatingID === seller.sellerID
                            ? 'Updating...'
                            : 'Approve'}
                    </button>

                    <button 
                        disabled={updatingID !== null}
                        onClick={() =>
                            updateSeller(seller.sellerID, 'rejected')
                        }
                    >
                        Reject
                    </button>
                </section>
            ))}
        </main>
    );
}