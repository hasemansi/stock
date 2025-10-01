import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

export default function Dashboard({ children }) {
    return (
        <div className={styles.dashboardWrapper}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <h2 className={styles.sidebarTitle}>College Stock</h2>

                {/* 1) College Management */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>College Management</h3>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/college">🏫 College</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/department">🏢 Department</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/faculty">👩‍🏫 Faculty</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/role">🛡 Roles</Link>
                        </li>
                    </ul>
                </div>

                {/* 2) Inventory */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Inventory</h3>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/supplier">🚚 Supplier</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/product">📦 Product</Link>
                        </li>
                    </ul>
                </div>

                {/* 3) Transactions */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Transactions</h3>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/inward-entry">⬆️ Receive Stock</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/outward-entry">⬇️ Issue Stock</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/order">📝 Order</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/order-details">📋 Order Details</Link>
                        </li>
                    </ul>
                </div>

                {/* 4) Logout */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Logout</h3>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} to="/login">🚪 Logout</Link>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <div className={styles.mainContainer}>
                {/* Navbar */}
                <header className={styles.navbar}>
                    <h1 className={styles.navbarTitle}>College Stock Management System</h1>
                </header>

                {/* Page Content */}
                <main className={styles.mainContent}>{children}</main>
            </div>
        </div>
    );
}
