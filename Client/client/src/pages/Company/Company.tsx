import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import companyBanner from "../../assets/images/Companysection.jpg";
import { clientService, type Client } from "../../services/clientService";
import { baseUrl } from "../../api/axiosInstance";
import "../../styles/Company/Company.css";

const Company = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await clientService.getAll();
        setClients(data);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    };
    fetchClients();
  }, []);

  return (
    <>
      {/* ===== COMPANY HERO BANNER ===== */}
      <section
        className="company-banner-section"
        style={{ backgroundImage: `url(${companyBanner})` }}
      >
        <div className="company-banner-overlay"></div>
        <div className="company-banner-content">
          <nav className="company-breadcrumb" aria-label="breadcrumb">
            <Link to="/">Home</Link>
            <span className="company-breadcrumb-separator">/</span>
            <span className="company-breadcrumb-current">Company</span>
          </nav>
          <h1 className="company-banner-title">Company</h1>
        </div>
      </section>

      {/* ===== COMPANY CONTENT SECTION ===== */}
      <section className="company-content-section">
        <div className="company-container">
          <h2 className="company-about-title">About Us</h2>

          {/* Company Introduction */}
          <div className="company-block">
            <h3 className="company-block-title">Company Introduction</h3>
            <p className="company-block-desc">
              JMN Infotech is a leading technology solutions provider dedicated to delivering high-quality software, applications, and support services. We empower businesses to grow, innovate, and achieve their full potential in today's dynamic digital landscape. With a team of experienced professionals and a commitment to excellence, we specialize in building robust solutions tailored to meet your unique needs and challenges.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="company-block">
            <h3 className="company-block-title">Mission & Vision</h3>
            <p className="company-block-desc">
              Our mission is to foster continuous growth and innovation by providing cutting-edge IT services and digital solutions that add lasting value to our clients globally. We envision becoming a trusted global leader in technology consultancy and development, recognized for our customer-centric approach, excellence in execution, and contribution towards digital transformation across diverse industries.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section className="company-content-section" style={{ backgroundColor: "#f9f9fb", borderTop: "1px solid #eaeaea" }}>
        <div className="company-container">
          <h2 className="company-about-title">Why Choose Us</h2>

          {/* Experience */}
          <div className="company-block">
            <h3 className="company-block-title">Experience</h3>
            <p className="company-block-desc">
              With years of industry expertise, we bring deep technical knowledge and a proven track record of successful project deliveries. Our seasoned professionals understand the nuances of different industry verticals, allowing us to build solutions that are not only robust but also highly optimized for real-world business environments.
            </p>
          </div>

          {/* Technologies */}
          <div className="company-block">
            <h3 className="company-block-title">Technologies</h3>
            <p className="company-block-desc">
              We leverage modern, cutting-edge technologies and development methodologies to build scalable, future-ready applications. From cloud integrations and modern web frameworks to robust database management and security architectures, we ensure your software remains scalable, secure, and performant as your business expands.
            </p>
          </div>

          {/* Client-Focused Approach */}
          <div className="company-block">
            <h3 className="company-block-title">Client-Focused Approach</h3>
            <p className="company-block-desc">
              Your success is our top priority. We follow a highly collaborative and transparent approach, working closely with your team throughout the project lifecycle. By understanding your specific goals, timelines, and business challenges, we align our development processes to deliver maximum value and exceptional support at every stage.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CLIENTS SECTION ===== */}
      <section className="company-content-section" style={{ backgroundColor: "#ffffff", borderTop: "1px solid #eaeaea" }}>
        <div className="company-container">
          <h2 className="company-about-title">Our Clients</h2>
          {clients.length > 0 ? (
            <div className="company-clients-grid">
              {clients.map((client) => (
                <div key={client.id} className="company-client-card">
                  <div className="company-client-logo-wrap">
                    <img
                      src={client.logo_image ? (client.logo_image.startsWith("http") ? client.logo_image : `${baseUrl}${client.logo_image}`) : ""}
                      alt={client.client_name}
                      className="company-client-logo"
                    />
                  </div>
                  <h4 className="company-client-name">{client.client_name}</h4>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "#737485" }}>Loading clients...</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Company;
