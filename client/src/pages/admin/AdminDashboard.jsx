import { Link } from 'react-router-dom';
import './AdminDashboard.css'

const dashboardItems = [
    {
        title: 'Manage Users',
        description: 'View and manage buyer and seller accounts.',
        path: '/admin/users',
        icon: '#',
    },
    {
        title: 'New Seller Approvals',
        description: 'Review pending seller applications.',
        path: '/admin/sellers',
        icon: '@',
    },
    {
        title: 'New Listing Approvals',
        description: 'Review and approve pending product listings.',
        path: '/admin/listings',
        icon: '%',
    },
    // {
    //     title: 'Manage Reports',
    //     description: 'Review reports submitted by users.',
    //     path: '/admin/reports',
    //     icon: '+',
    // },
];

function AdminDashboard() {
    return (
        <div className="seller-account-container">
            <section className="">
                <h2>Dashboard Overview</h2>
                <p>Select a section to manage</p>
            </section>

            <section className="admin-grid">
                {dashboardItems.map((item) => (
                    <Link
                        to={item.path}
                        className="admin-card"
                        key={item.path}
                    >
                        <span className="admin-card-icon">{item.icon}</span>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <span className="admin-card-link">
                            Open section
                        </span>
                    </Link>
                ))}
            </section>
        </div>
    )
}

export default AdminDashboard;