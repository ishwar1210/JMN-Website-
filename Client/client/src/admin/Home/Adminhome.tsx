import { useState, useEffect } from "react";
import { getHomeData, updateHomeData } from "../../services/homeService";
import type { HomeData } from "../../services/homeService";
import "../../styles/admin/AdminHome.css";

const AdminHome = () => {
  const [homeId, setHomeId] = useState<number | null>(null);
  const [existingVideo, setExistingVideo] = useState<string>("");
  const [loadingExisting, setLoadingExisting] = useState(true);

  const [formData, setFormData] = useState({
    home_title: "",
    home_desc: "",
    company_exp: "",
    apps_dev: "",
    project_dev: "",
    countries_served: "",
    client_satisfaction_percent: "",
    talented_squad: "",
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch existing home data on mount
  useEffect(() => {
    const fetchExisting = async () => {
      try {
        const response = await getHomeData();
        if (response.success && response.data.length > 0) {
          const existing: HomeData = response.data[0];
          setHomeId(existing.id);
          setFormData({
            home_title: existing.home_title || "",
            home_desc: existing.home_desc || "",
            company_exp: existing.company_exp !== null ? String(existing.company_exp) : "",
            apps_dev: existing.apps_dev !== null ? String(existing.apps_dev) : "",
            project_dev: existing.project_dev !== null ? String(existing.project_dev) : "",
            countries_served: existing.countries_served !== null ? String(existing.countries_served) : "",
            client_satisfaction_percent: existing.client_satisfaction_percent
              ? String(parseFloat(existing.client_satisfaction_percent))
              : "",
            talented_squad: existing.talented_squad !== null ? String(existing.talented_squad) : "",
          });
          if (existing.home_video) {
            setExistingVideo(existing.home_video);
          }
        }
      } catch {
        // No existing data — user can add new via PUT as well
      } finally {
        setLoadingExisting(false);
      }
    };
    fetchExisting();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setMessage({ type: "error", text: "Please select a valid video file." });
      return;
    }

    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setExistingVideo("");
    setMessage(null);
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setVideoPreview("");
    setExistingVideo("");
    if (videoPreview) URL.revokeObjectURL(videoPreview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (homeId === null) {
      setMessage({ type: "error", text: "No home record found to update. Please ensure data exists first." });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const payload: Parameters<typeof updateHomeData>[1] = {};

      if (formData.home_title.trim()) payload.home_title = formData.home_title.trim();
      if (formData.home_desc.trim()) payload.home_desc = formData.home_desc.trim();
      if (formData.company_exp) payload.company_exp = Number(formData.company_exp);
      if (formData.apps_dev) payload.apps_dev = Number(formData.apps_dev);
      if (formData.project_dev) payload.project_dev = Number(formData.project_dev);
      if (formData.countries_served) payload.countries_served = Number(formData.countries_served);
      if (formData.client_satisfaction_percent) payload.client_satisfaction_percent = Number(formData.client_satisfaction_percent);
      if (formData.talented_squad) payload.talented_squad = Number(formData.talented_squad);
      if (videoFile) payload.home_video = videoFile;

      const response = await updateHomeData(homeId, payload);

      if (response.success) {
        setMessage({ type: "success", text: "Home page data updated successfully!" });
        // Update the existing video reference if a new one was uploaded
        if (response.data && response.data.length > 0) {
          setExistingVideo(response.data[0].home_video);
        }
        setVideoFile(null);
        setVideoPreview("");
      } else {
        setMessage({ type: "error", text: "Failed to update data. Please try again." });
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setMessage({
        type: "error",
        text: err.response?.data?.message || "An error occurred while updating.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loadingExisting) {
    return (
      <div className="admin-page">
        <h1>Home Page Management</h1>
        <p>Loading existing data...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1>Home Page Management</h1>
      <p>Manage the content displayed on the Home page of your website.</p>

      {message && (
        <div className={`admin-alert admin-alert-${message.type}`}>
          {message.text}
          <button className="admin-alert-close" onClick={() => setMessage(null)}>&times;</button>
        </div>
      )}

      {homeId === null && (
        <div className="admin-alert admin-alert-info">
          No existing home record found. Please add data first via the backend or create a record to enable updates.
        </div>
      )}

      <form className="admin-home-form" onSubmit={handleSubmit}>
        {/* Title & Description */}
        <div className="admin-form-section">
          <h2>Hero Section</h2>
          <div className="admin-form-group">
            <label htmlFor="home_title">Home Title</label>
            <input
              id="home_title"
              name="home_title"
              type="text"
              value={formData.home_title}
              onChange={handleChange}
              placeholder="e.g. JMN Infotech Private Limited"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="home_desc">Home Description</label>
            <textarea
              id="home_desc"
              name="home_desc"
              value={formData.home_desc}
              onChange={handleChange}
              placeholder="Describe your company..."
              rows={4}
            />
          </div>
        </div>

        {/* Stats / Numbers */}
        <div className="admin-form-section">
          <h2>Company Statistics</h2>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="company_exp">Years of Experience</label>
              <input
                id="company_exp"
                name="company_exp"
                type="number"
                min="0"
                value={formData.company_exp}
                onChange={handleChange}
                placeholder="e.g. 10"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="apps_dev">Apps Developed</label>
              <input
                id="apps_dev"
                name="apps_dev"
                type="number"
                min="0"
                value={formData.apps_dev}
                onChange={handleChange}
                placeholder="e.g. 50"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="project_dev">Projects Delivered</label>
              <input
                id="project_dev"
                name="project_dev"
                type="number"
                min="0"
                value={formData.project_dev}
                onChange={handleChange}
                placeholder="e.g. 200"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="countries_served">Countries Served</label>
              <input
                id="countries_served"
                name="countries_served"
                type="number"
                min="0"
                value={formData.countries_served}
                onChange={handleChange}
                placeholder="e.g. 15"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="client_satisfaction_percent">Client Satisfaction (%)</label>
              <input
                id="client_satisfaction_percent"
                name="client_satisfaction_percent"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.client_satisfaction_percent}
                onChange={handleChange}
                placeholder="e.g. 98.5"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="talented_squad">Talented Squad</label>
              <input
                id="talented_squad"
                name="talented_squad"
                type="number"
                min="0"
                value={formData.talented_squad}
                onChange={handleChange}
                placeholder="e.g. 45"
              />
            </div>
          </div>
        </div>

        {/* Video Upload */}
        <div className="admin-form-section">
          <h2>Home Video</h2>

          {existingVideo && !videoFile && (
            <div className="admin-video-preview">
              <p className="admin-form-hint" style={{ marginBottom: 8 }}>Current video:</p>
              <video src={existingVideo.startsWith("http") ? existingVideo : `http://192.168.1.47:5000${existingVideo}`} controls width="100%" />
            </div>
          )}

          <div className="admin-form-group">
            <label htmlFor="home_video">
              {existingVideo ? "Replace Video (optional)" : "Upload Video"}
            </label>
            <input
              id="home_video"
              name="home_video"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
            />
            <p className="admin-form-hint">Supported formats: MP4, WebM, Ogg, etc. Leave empty to keep the current video.</p>
          </div>

          {videoPreview && (
            <div className="admin-video-preview">
              <p className="admin-form-hint" style={{ marginBottom: 8 }}>New video preview:</p>
              <video src={videoPreview} controls width="100%" />
              <button type="button" className="admin-remove-btn" onClick={handleRemoveVideo}>
                Remove Video
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="admin-form-actions">
          <button type="submit" className="admin-submit-btn" disabled={saving || homeId === null}>
            {saving ? "Updating..." : "Update Home Page Data"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminHome;