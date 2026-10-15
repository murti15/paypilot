import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    Bell,
    Building2,
    ChevronDown,
    CircleHelp,
    Command,
    Download,
    LayoutDashboard,
    Search,
    Settings,
    ShieldCheck,
    Users,
    Wallet,
} from "lucide-react";

const employees = [
    { initials: "AS", name: "Aarav Sharma", role: "Senior Engineer", department: "Engineering", country: "India", status: "Active", color: "violet" },
    { initials: "EM", name: "Emma Mitchell", role: "Product Designer", department: "Design", country: "United States", status: "Active", color: "orange" },
    { initials: "LC", name: "Lucas Chen", role: "Data Analyst", department: "Analytics", country: "Singapore", status: "Active", color: "blue" },
    { initials: "SP", name: "Sofia Patel", role: "People Partner", department: "People", country: "United Kingdom", status: "On leave", color: "pink" },
];

function App() {
    return (
        <div className="app-shell">
            <aside className="sidebar">
                <a className="brand" href="#">
                    <span className="brand-mark"><Wallet size={21} /></span>
                    <span>paypilot<span className="brand-dot">.</span></span>
                </a>

                <div className="workspace-label">WORKSPACE</div>
                <button className="workspace-switch">
                    <span className="workspace-icon"><Building2 size={17} /></span>
                    <span className="workspace-copy"><strong>Acme Corporation</strong><small>Enterprise workspace</small></span>
                    <ChevronDown size={16} />
                </button>

                <div className="nav-label">OVERVIEW</div>
                <nav className="navigation">
                    <a className="nav-item active" href="#"><LayoutDashboard size={18} /> Dashboard</a>
                    <a className="nav-item" href="#employees"><Users size={18} /> Employees <span className="nav-count">10k</span></a>
                    <a className="nav-item" href="#compensation"><Wallet size={18} /> Compensation</a>
                    <a className="nav-item" href="#analytics"><Activity size={18} /> Analytics</a>
                </nav>

                <div className="nav-label management-label">MANAGEMENT</div>
                <nav className="navigation">
                    <a className="nav-item" href="#access"><ShieldCheck size={18} /> Access & roles</a>
                    <a className="nav-item" href="#settings"><Settings size={18} /> Settings</a>
                </nav>

                <div className="sidebar-bottom">
                    <div className="help-card">
                        <span className="help-icon"><CircleHelp size={17} /></span>
                        <strong>Need a hand?</strong>
                        <p>Explore the workspace guide and learn your way around.</p>
                        <a href="#help">View help center <span>↗</span></a>
                    </div>
                    <div className="profile">
                        <div className="avatar profile-avatar">HR</div>
                        <div className="profile-copy"><strong>HR Manager</strong><small>Administrator</small></div>
                        <ChevronDown size={16} />
                    </div>
                </div>
            </aside>

            <main className="main-content">
                <header className="topbar">
                    <div className="breadcrumbs">Workspace <span>/</span> <strong>Dashboard</strong></div>
                    <div className="topbar-actions">
                        <button className="search-button"><Search size={16} /><span>Search anything...</span><kbd>⌘ K</kbd></button>
                        <button className="icon-button" aria-label="Notifications"><Bell size={19} /><i /></button>
                        <div className="avatar top-avatar">HR</div>
                    </div>
                </header>

                <div className="page-content">
                    <section className="welcome-row">
                        <div>
                            <div className="eyebrow"><span className="live-dot" /> PEOPLE & COMPENSATION</div>
                            <h1>Your people, <span>in perspective.</span></h1>
                            <p className="page-subtitle">A clear view of your workforce and compensation at a glance.</p>
                        </div>
                        <button className="secondary-button"><Download size={16} /> Export report</button>
                    </section>

                    <section className="insight-banner">
                        <div className="insight-symbol"><Activity size={21} /></div>
                        <div className="insight-copy">
                            <strong>Your workforce overview</strong>
                            <p>This is the initial dashboard preview. Live metrics will be connected to the salary management API.</p>
                        </div>
                        <span className="preview-tag">PREVIEW DATA</span>
                    </section>

                    <section className="metrics-grid" aria-label="Workforce summary">
                        <article className="metric-card">
                            <div className="metric-heading"><span>Total employees</span><span className="metric-icon purple"><Users size={19} /></span></div>
                            <div className="metric-value">10,000</div>
                            <div className="metric-foot"><span className="trend positive"><ArrowUpRight size={15} /> Seed target</span><span>Planned dataset</span></div>
                            <div className="metric-bar"><span style={{ width: "82%" }} /></div>
                        </article>
                        <article className="metric-card">
                            <div className="metric-heading"><span>Active workforce</span><span className="metric-icon green"><Activity size={19} /></span></div>
                            <div className="metric-value">—</div>
                            <div className="metric-foot"><span>Awaiting API</span><span>Live calculation</span></div>
                            <div className="metric-bar green-bar"><span style={{ width: "64%" }} /></div>
                        </article>
                        <article className="metric-card">
                            <div className="metric-heading"><span>Compensation</span><span className="metric-icon orange"><Wallet size={19} /></span></div>
                            <div className="metric-value metric-placeholder">Currency-aware</div>
                            <div className="metric-foot"><span>Multi-currency</span><span>Totals kept separate</span></div>
                            <div className="metric-bar orange-bar"><span style={{ width: "72%" }} /></div>
                        </article>
                        <article className="metric-card">
                            <div className="metric-heading"><span>Recent changes</span><span className="metric-icon blue"><ArrowDownRight size={19} /></span></div>
                            <div className="metric-value">—</div>
                            <div className="metric-foot"><span>Audit history</span><span>Awaiting API</span></div>
                            <div className="metric-bar blue-bar"><span style={{ width: "48%" }} /></div>
                        </article>
                    </section>

                    <section className="directory-panel" id="employees">
                        <div className="panel-heading">
                            <div><h2>Employee directory</h2><p>Browse and manage your organization's people.</p></div>
                            <button className="secondary-button compact"><Download size={15} /> Export</button>
                        </div>
                        <div className="directory-toolbar">
                            <label className="directory-search"><Search size={17} /><input aria-label="Search employees" placeholder="Search by name, email or ID..." /></label>
                            <button className="filter-button">Department <ChevronDown size={15} /></button>
                            <button className="filter-button">Country <ChevronDown size={15} /></button>
                            <button className="filter-button">Status <ChevronDown size={15} /></button>
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead><tr><th>EMPLOYEE</th><th>DEPARTMENT</th><th>COUNTRY</th><th>STATUS</th><th><span className="salary-heading">SALARY <ShieldCheck size={13} /></span></th></tr></thead>
                                <tbody>
                                    {employees.map((employee) => (
                                        <tr key={employee.initials}>
                                            <td><div className="employee-cell"><span className={`avatar employee-avatar ${employee.color}`}>{employee.initials}</span><span><strong>{employee.name}</strong><small>{employee.role}</small></span></div></td>
                                            <td>{employee.department}</td>
                                            <td>{employee.country}</td>
                                            <td><span className={`status ${employee.status === "Active" ? "status-active" : "status-leave"}`}><i />{employee.status}</span></td>
                                            <td><span className="restricted"><ShieldCheck size={14} /> HR access</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="table-footer"><span>Sample rows for layout preview · Not connected to the database</span><button className="text-button">View directory <span>→</span></button></div>
                    </section>

                    <footer className="page-footer"><span><Command size={14} /> PayPilot <span className="footer-separator">·</span> Compensation clarity</span><span>Initial UI preview <span className="footer-separator">·</span> Data integration pending</span></footer>
                </div>
            </main>
        </div>
    );
}

export default App;