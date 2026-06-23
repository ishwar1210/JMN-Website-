const AdminWhatWeDo = () => {
  return (
    <div className="admin-page">
      <h1>What We Do Management</h1>
      <p>Manage the "What We Do" section content and services offered.</p>
      <div className="admin-card-grid">
        <div className="admin-stats-card">
          <h3>Services</h3>
          <div className="stat-number">Manage</div>
        </div>
        <div className="admin-stats-card">
          <h3>Categories</h3>
          <div className="stat-number">Manage</div>
        </div>
        <div className="admin-stats-card">
          <h3>Add New</h3>
          <div className="stat-number">Create</div>
        </div>
      </div>
    </div>
  );
};

export default AdminWhatWeDo;