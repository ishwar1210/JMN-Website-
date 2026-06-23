const AdminCareer = () => {
  return (
    <div className="admin-page">
      <h1>Career Management</h1>
      <p>Manage job postings and career opportunities.</p>
      <div className="admin-card-grid">
        <div className="admin-stats-card">
          <h3>Job Openings</h3>
          <div className="stat-number">Manage</div>
        </div>
        <div className="admin-stats-card">
          <h3>Applications</h3>
          <div className="stat-number">View</div>
        </div>
        <div className="admin-stats-card">
          <h3>Add New Job</h3>
          <div className="stat-number">Create</div>
        </div>
      </div>
    </div>
  );
};

export default AdminCareer;