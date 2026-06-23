const AdminContact = () => {
  return (
    <div className="admin-page">
      <h1>Contact Us Management</h1>
      <p>Manage contact form submissions and contact information.</p>
      <div className="admin-card-grid">
        <div className="admin-stats-card">
          <h3>Messages</h3>
          <div className="stat-number">View</div>
        </div>
        <div className="admin-stats-card">
          <h3>Contact Info</h3>
          <div className="stat-number">Edit</div>
        </div>
        <div className="admin-stats-card">
          <h3>Map Settings</h3>
          <div className="stat-number">Edit</div>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;