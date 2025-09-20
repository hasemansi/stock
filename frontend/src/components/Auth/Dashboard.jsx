import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

export default function dashboard({ children }) {
    return (
        <div className={styles.dashboardContainer}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <h2 className={styles.sidebarTitle}>College Stock</h2>
                <nav>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}><Link className={styles.navLink} to="/">📊 Dashboard</Link></li>
                        <li className={styles.navItem}><Link className={styles.navLink} to="/inventory">📦 Inventory</Link></li>
                        <li className={styles.navItem}><Link className={styles.navLink} to="/transactions">🔄 Transactions</Link></li>
                        <li className={styles.navItem}><Link className={styles.navLink} to="/reports">📑 Reports</Link></li>
                        <li className={styles.navItem}><Link className={styles.navLink} to="/admin">⚙️ Administration</Link></li>
                        <li className={styles.navItem}><Link className={styles.navLink} to="/help">❓ Help</Link></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
