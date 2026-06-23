const AdminTechnologies = () => {
  return (
    <div className="admin-page">
      <h1>Technologies Management</h1>
      <p>Manage the technologies and tools your company works with.</p>
      <div className="admin-card-grid">
        <div className="admin-stats-card">
          <h3>Tech Stack</h3>
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

export default AdminTechnologies;