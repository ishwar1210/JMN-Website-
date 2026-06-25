import { useState, useEffect, type FormEvent } from "react";
import { clientService, type Client, type ClientFormData } from "../../services/clientService";
import { baseUrl } from "../../api/axiosInstance";
import "../../styles/admin/AdminClients.css";

const AdminClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Form fields
  const [clientName, setClientName] = useState<string>("");
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const fetchClients = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await clientService.getAll();
      setClients(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch clients";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all clients on mount
  useEffect(() => {
    const loadClients = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await clientService.getAll();
        setClients(data);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch clients";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    loadClients();
  }, []);

  // Open form for adding
  const handleOpenAddForm = () => {
    setEditingClient(null);
    setClientName("");
    setLogoFile(null);
    setShowForm(true);
  };

  // Open form for editing
  const handleOpenEditForm = (client: Client) => {
    setEditingClient(client);
    setClientName(client.client_name);
    setLogoFile(null);
    setShowForm(true);
  };

  // Close form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingClient(null);
    setClientName("");
    setLogoFile(null);
  };

  // Handle form submit (create or update)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    setSubmitting(true);
    try {
      const data: ClientFormData = {
        client_name: clientName.trim(),
        logo_image: logoFile,
      };

      if (editingClient) {
        // Update existing client
        await clientService.update(editingClient.id, data);
      } else {
        // Create new client
        await clientService.create(data);
      }

      await fetchClients();
      handleCloseForm();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save client";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    setSubmitting(true);
    try {
      await clientService.delete(id);
      await fetchClients();
      setShowDeleteConfirm(null);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete client";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Get full logo URL
  const getLogoUrl = (logoPath: string) => {
    if (!logoPath) return "";
    if (logoPath.startsWith("http")) return logoPath;
    return `${baseUrl}${logoPath}`;
  };

  return (
    <div className="admin-clients-page">
      {/* Header with Add button */}
      <div className="admin-clients-header">
        <h1>Clients Management</h1>
        <button className="client-add-btn" onClick={handleOpenAddForm}>
          + Add Client
        </button>
      </div>

      {/* Error display */}
      {error && <div className="client-error">{error}</div>}

      {/* Loading state */}
      {loading && <div className="client-loading">Loading clients...</div>}

      {/* Clients table */}
      {!loading && clients.length > 0 && (
        <div className="client-table-wrapper">
          <table className="client-table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Client Name</th>
                <th>Created At</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>
                    {client.logo_image ? (
                      <img
                        src={getLogoUrl(client.logo_image)}
                        alt={client.client_name}
                        className="client-logo-img"
                      />
                    ) : (
                      <div className="client-logo-img" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", color: "#ccc" }}>
                        ?
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="client-name-cell">{client.client_name}</span>
                  </td>
                  <td>
                    {new Date(client.created_at).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="actions-cell">
                    <button
                      className="client-action-btn edit-btn"
                      title="Edit client"
                      onClick={() => handleOpenEditForm(client)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      className="client-action-btn delete-btn"
                      title="Delete client"
                      onClick={() => setShowDeleteConfirm(client.id)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty state */}
      {!loading && clients.length === 0 && !error && (
        <div className="client-empty">
          No clients found. Click "Add Client" to create one.
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="client-form-overlay" onClick={handleCloseForm}>
          <div className="client-form-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingClient ? "Edit Client" : "Add New Client"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="client-form-group">
                <label htmlFor="clientName">Client Name</label>
                <input
                  id="clientName"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div className="client-form-group">
                <label htmlFor="logoFile">
                  Logo Image {editingClient ? "(Leave empty to keep current)" : ""}
                </label>
                <input
                  id="logoFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setLogoFile(file);
                  }}
                />
                {editingClient && editingClient.logo_image && (
                  <div className="current-logo-preview">
                    <img
                      src={getLogoUrl(editingClient.logo_image)}
                      alt="Current logo"
                    />
                    Current logo
                  </div>
                )}
              </div>
              <div className="client-form-actions">
                <button
                  type="button"
                  className="client-btn-cancel"
                  onClick={handleCloseForm}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="client-btn-submit"
                  disabled={submitting || !clientName.trim()}
                >
                  {submitting
                    ? "Saving..."
                    : editingClient
                    ? "Update"
                    : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm !== null && (
        <div
          className="delete-confirm-overlay"
          onClick={() => setShowDeleteConfirm(null)}
        >
          <div
            className="delete-confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Delete Client</h3>
            <p>
              Are you sure you want to delete this client? This action cannot be
              undone.
            </p>
            <div className="delete-confirm-actions">
              <button
                className="client-btn-cancel"
                onClick={() => setShowDeleteConfirm(null)}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                className="client-btn-submit"
                onClick={() => handleDelete(showDeleteConfirm)}
                disabled={submitting}
                style={{ background: "#e94560" }}
              >
                {submitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClients;