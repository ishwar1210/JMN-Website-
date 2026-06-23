const AdminDashboard = () => {
  return (
    <div className="admin-page">
      <h1>Dashboard</h1>
      <p>Welcome to the JMN Admin Panel. Here you can manage your website content.</p>
      <div className="admin-card-grid">
        <div className="admin-stats-card">
          <h3>Total Pages</h3>
          <div className="stat-number">6</div>
        </div>
        <div className="admin-stats-card">
          <h3>Active Menu Items</h3>
          <div className="stat-number">6</div>
        </div>
        <div className="admin-stats-card">
          <h3>Site Status</h3>
          <div className="stat-number">Live</div>
        </div>
        <div className="admin-stats-card">
          <h3>Last Updated</h3>
          <div className="stat-number">Today</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;