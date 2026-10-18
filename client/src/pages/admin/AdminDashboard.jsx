import { Link } from 'react-router-dom';
import './AdminDashboard.css'

const dashboardItems = [
    {
        title: 'Manage Users',
        description: 'View and manage buyer and seller accounts.',
        path: 'admin/users',
        icon: '#',
    },
    {
        title: 'Seller Approvals',
        description: 'Review pending seller applications.',
        path: '/admin/sellers',
        icon: '@',
    },
    {
        title: 'Manage Reports',
        description: 'Review reports submitted by users.',
        path: '/admin/reports',
        icon: '+',
    },
];

function AdminDashboard() {
    return (
        <main className="admin-dashboard">
            <header className="admin-header">
                <div>
                    <h1>Bulldog-Records Admin</h1>
                    <p>Placeholder text.</p>
                </div>
            </header>

            <section className="admin-welcome">
                <h2>Dashboard Overview</h2>
                <p>Select a section to manage.</p>
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
        </main>
    )
}

export default AdminDashboard;