import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endpoint";
import "../../styles/Carrer/JobApplicationModal.css";

interface JobApplicationModalProps {
  open: boolean;
  jobTitle: string;
  onClose: () => void;
}

interface FormData {
  candidate_name: string;
  candidate_contact: string;
  candidate_email: string;
  candidate_location: string;
  resume: File | null;
}

const initialForm: FormData = {
  candidate_name: "",
  candidate_contact: "",
  candidate_email: "",
  candidate_location: "",
  resume: null,
};

const JobApplicationModal = ({ open, jobTitle, onClose }: JobApplicationModalProps) => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [resumeName, setResumeName] = useState("");

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "resume" && files && files.length > 0) {
      setForm((prev) => ({ ...prev, resume: files[0] }));
      setResumeName(files[0].name);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("candidate_name", form.candidate_name);
      formData.append("candidate_contact", form.candidate_contact);
      formData.append("candidate_email", form.candidate_email);
      formData.append("candidate_location", form.candidate_location);
      formData.append("job_title", jobTitle);
      if (form.resume) {
        formData.append("resume", form.resume);
      }

      const res = await axios.post(`${baseUrl}${ENDPOINTS.CAREER_APPLICATIONS}`, formData);

      if (res.data.success) {
        setSuccess(true);
        setForm(initialForm);
        setResumeName("");
      } else {
        setError(res.data.message || "Application submission failed. Please try again.");
      }
    } catch (err: unknown) {
      let msg = "Something went wrong. Please try again.";
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        msg = axiosErr.response?.data?.message || msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setForm(initialForm);
    setSuccess(false);
    setError("");
    setResumeName("");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
          &times;
        </button>

        <h2 className="modal-title">Apply for Position</h2>
        <p className="modal-subtitle">
          You are applying for: <strong>{jobTitle}</strong>
        </p>

        {success ? (
          <div className="modal-success">
            <p>Your application has been submitted successfully!</p>
            <button className="modal-ok-btn" onClick={handleClose}>
              OK
            </button>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <label className="modal-field">
              <span>Full Name *</span>
              <input
                type="text"
                name="candidate_name"
                value={form.candidate_name}
                onChange={handleChange}
                required
                placeholder="Enter Full Name"
              />
            </label>

            <label className="modal-field">
              <span>Contact Number *</span>
              <input
                type="tel"
                name="candidate_contact"
                value={form.candidate_contact}
                onChange={handleChange}
                required
                placeholder="Enter Contact Number"
              />
            </label>

            <label className="modal-field">
              <span>Email *</span>
              <input
                type="email"
                name="candidate_email"
                value={form.candidate_email}
                onChange={handleChange}
                required
                placeholder="Enter Email"
              />
            </label>

            <label className="modal-field">
              <span>Location *</span>
              <input
                type="text"
                name="candidate_location"
                value={form.candidate_location}
                onChange={handleChange}
                required
                placeholder="Enter Location"
              />
            </label>

            <label className="modal-field">
              <span>Resume *</span>
              <div className="modal-file-wrapper">
                <input
                  type="file"
                  name="resume"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  required
                  className="modal-file-input"
                />
                <label htmlFor="resume-upload" className="modal-file-label">
                  {resumeName ? resumeName : "Choose Resume (PDF/DOC)"}
                </label>
              </div>
            </label>

            {error && <p className="modal-error">{error}</p>}

            <button
              type="submit"
              className="modal-submit-btn"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobApplicationModal;