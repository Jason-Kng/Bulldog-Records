import { useEffect, useState } from 'react';

export default function ApproveListings({ token }) {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [updatingID, setUpdatingID] = useState(null);

    const apiURL = 'http://localhost:3000/api/admin';

    async function loadPendingListings() {
        if (!token){
            setError('Please log in as an administrator.');
            setLoading(false);
            return;
        }
        
        setLoading(true);
        setError('');

        try {
            const response = await fetch(
                `${apiURL}/listings/pending`,
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
                            : `Failed to load listings (${response.status}).`
                );
            }

            const data = await response.json();
            setListings(data);
        } catch (err) {
            setError(err.message || 'Could not connect to the server.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (token) {
            loadPendingListings();
        } else {
            setLoading(false);
            setError('Please log in as an administrator.');
        }
    }, [token]);

    async function updateListing(listingID) {
        setUpdatingID(listingID);
        setError('');
        setMessage('');

        try {
            const response = await fetch(
                `${apiURL}/listings/${listingID}/status`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.error || `Approval failed (${response.status}).`
                );
            }

            setListings(current =>
                current.filter(listing => listing.listingID !== listingID)
            );

            setMessage(
                `LIsting ${listingID} was approved successfully.`
            );
        } catch (err) {
            setError(err.message || 'Could not approve listing.');
        } finally {
            setUpdatingID(null);
        }
    }

    if (loading) {
        return <p>Loading pending listings...</p>;
    }

    return (
        <main className="admin-approvals">
            <h1>Listing Approvals</h1>

            {error && <p role="alert">{error}</p>}
            {message && <p role="status">{message}</p>}

            <button onClick={loadPendingListings}>
                Refresh list
            </button>

            {!error && listings.length ===0 && (
                <p>There are no listings waiting for approval.</p>
            )}

            {listings.map(listing => (
                <section
                    key={listing.listingID}
                    className="listing-card"
                >
                    <h2>{listing.title}</h2>
                    <p>Artist: {listing.artist}</p>
                    <p>Listing ID: {listing.listingID}</p>
                    <p>Seller: {listing.sellerName}</p>
                    <p>Seller email: {listing.sellerEmail}</p>
                    <p>Genre: {listing.genre}</p>
                    <p>Media Type: {listing.mediaType}</p>
                    <p>Condition: {listing.condition}</p>
                    <p>Stock: {listing.stock}</p>
                    <p>Price: ${listing.price}</p>
                    <p>Status: {listing.listingStatus === 1 ? 'Approved' : 'Pending'}</p>

                    {listing.photo && (
                        <img
                            src={listing.photo}
                            alt={listing.title}
                            style={{ maxWidth: '200px' }}
                        />
                    )}

                    <div>
                        <button
                            disabled={updatingID !== null}
                            onClick={() =>
                                updateListing(
                                    listing.listingID
                                )
                            }
                        >
                            {updatingID === listing.listingID
                                ? 'Updating...'
                                : 'Approve'}
                        </button>
                    </div>
                </section>
            ))}
        </main>
    );
}