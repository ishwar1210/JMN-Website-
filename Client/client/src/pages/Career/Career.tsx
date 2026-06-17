import { Link } from "react-router-dom";
import careerBanner from "../../assets/images/carrer_bannar.jpg";
import EarlyCareers from "../../assets/images/Early_Careers.png";
import Experienced from "../../assets/images/Experienced_Professionals.png";
import Benefits from "../../assets/images/Benefits.jpg";
import purpose from "../../assets/images/purpose.jpg";

import "../../styles/Carrer/Career.css";
import { useEffect, useRef, useState } from "react";

const benefitsSlides = [
  {
    id: 1,
    img: Benefits,
    text: "Explore limitless opportunities to grow, innovate, and collaborate with industry leaders on cutting-edge technologies. JMN offers a dynamic work environment that fosters continuous learning, innovation, and a commitment to fairness. With exceptional benefits and boundless growth prospects, you can build a rewarding career beyond boundaries.",
  },
];

// ── Job data — baad mein backend API se replace karna ──
const jobOpenings = [
  {
    id: 1,
    title: "React Developer",
    category: "Frontend",
    location: "Nashik, India",
    type: "Full-Time",
    dept: "Engineering",
    isNew: true,
    desc: "Build and maintain high-quality web applications using React, TypeScript, and modern frontend tooling.",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    category: "Frontend",
    location: "Nashik, India",
    type: "Full-Time",
    dept: "Design",
    isNew: true,
    desc: "Design intuitive, pixel-perfect interfaces for mobile and web applications using Figma and modern design systems.",
  },
  {
    id: 3,
    title: "Node.js Backend Developer",
    category: "Backend",
    location: "Nashik, India",
    type: "Full-Time",
    dept: "Engineering",
    isNew: true,
    desc: "Develop scalable REST APIs and microservices using Node.js, Express, and MySQL/PostgreSQL.",
  },
  {
    id: 4,
    title: "Java Spring Boot Developer",
    category: "Backend",
    location: "Nashik, India",
    type: "Full-Time",
    dept: "Engineering",
    isNew: false,
    desc: "Design and build enterprise-grade backend systems using Spring Boot, REST APIs, and cloud infrastructure.",
  },
  {
    id: 5,
    title: "QA Test Engineer",
    category: "Tester",
    location: "Nashik, India",
    type: "Full-Time",
    dept: "Quality Assurance",
    isNew: true,
    desc: "Plan and execute manual and automated test cases to ensure product quality across web and mobile platforms.",
  },
  {
    id: 6,
    title: "Automation QA Engineer",
    category: "Tester",
    location: "Nashik, India",
    type: "Full-Time",
    dept: "Quality Assurance",
    isNew: false,
    desc: "Build and maintain automated testing frameworks using Selenium, Cypress, or Playwright for end-to-end coverage.",
  },
];

const FILTER_TABS = ["All", "Frontend", "Backend", "Tester"] as const;
type FilterTab = (typeof FILTER_TABS)[number];

const Career = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [listVisible, setListVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % benefitsSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setListVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredJobs =
    activeFilter === "All"
      ? jobOpenings
      : jobOpenings.filter((j) => j.category === activeFilter);

  return (
    <>
      {/* ===== CAREER HERO BANNER ===== */}
      <section
        className="career-banner-section"
        style={{ backgroundImage: `url(${careerBanner})` }}
      >
        <div className="career-banner-overlay"></div>
        <div className="career-banner-content">
          <nav className="career-breadcrumb" aria-label="breadcrumb">
            <Link to="/">Home</Link>
            <span className="career-breadcrumb-separator">/</span>
            <span className="career-breadcrumb-current">Career</span>
          </nav>
          <h1 className="career-banner-title">
            Our reinvention <br />
            starts with you.
          </h1>
        </div>
      </section>

      {/* ===== CAREER PATHS SECTION ===== */}
      <section className="career-paths-section">
        <div className="career-paths-container">
          <div className="career-path-card">
            <div className="career-path-img-wrapper">
              <img src={EarlyCareers} alt="Early Careers" />
            </div>
            <p className="career-path-label">Early Careers</p>
          </div>
          <div className="career-path-card">
            <div className="career-path-img-wrapper">
              <img src={Experienced} alt="Experienced Professionals" />
            </div>
            <p className="career-path-label">Experienced Professionals</p>
          </div>
        </div>
      </section>

      {/* ===== WHY WE DO IT SECTION ===== */}
      <section className="why-section">
        <div className="why-container">
          <h2 className="why-heading">Why We Do It</h2>
          <p className="why-tagline">Because we care deeply.</p>
          <p className="why-para">
            Lead the next chapter by creating real-world impact. Share our
            values, be driven by our strong sense of purpose, and act with
            compassion to elevate yourself and the world around you.
          </p>
        </div>
      </section>

      {/* ===== BENEFITS SECTION ===== */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-text">
            <h2 className="benefits-heading">Benefits</h2>
            <p className="benefits-para">{benefitsSlides[activeSlide].text}</p>
          </div>
          <div className="benefits-right">
            <div className="benefits-img-wrapper">
              <img
                src={benefitsSlides[activeSlide].img}
                alt="Benefits"
                className="benefits-img"
              />
            </div>
            <div className="benefits-dots">
              {benefitsSlides.map((_, i) => (
                <button
                  key={i}
                  className={`benefits-dot${
                    i === activeSlide ? " benefits-dot--active" : ""
                  }`}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CURRENT JOB OPENINGS SECTION ===== */}
      <section className="job-openings-section">
        <div className="job-openings-container">
          <div className="job-openings-header">
            <h2 className="job-openings-title">Current Job Openings</h2>
            <p className="job-openings-subtitle">
              Explore our open positions and find the role that fits you best.
            </p>

            {/* ── Filter Tabs ── */}
            <div className="job-filter-tabs">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  className={`job-filter-tab${
                    activeFilter === tab ? " job-filter-tab--active" : ""
                  }`}
                  onClick={() => setActiveFilter(tab)}
                >
                  {tab}
                  <span className="job-filter-tab-count">
                    {tab === "All"
                      ? jobOpenings.length
                      : jobOpenings.filter((j) => j.category === tab).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div
            ref={listRef}
            className={`job-openings-list${
              listVisible ? " job-openings-list--visible" : ""
            }`}
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div className="job-opening-card" key={job.id}>
                  {job.isNew && (
                    <div className="job-opening-tag">New</div>
                  )}
                  <div className="job-opening-category-badge">
                    {job.category}
                  </div>
                  <h3 className="job-opening-title">{job.title}</h3>
                  <div className="job-opening-meta">
                    <span className="job-opening-location">
                      📍 {job.location}
                    </span>
                    <span className="job-opening-type">⏳ {job.type}</span>
                    <span className="job-opening-dept">💼 {job.dept}</span>
                  </div>
                  <p className="job-opening-desc">{job.desc}</p>
                  <a href="#apply" className="job-opening-apply">
                    Apply Now &rsaquo;
                  </a>
                </div>
              ))
            ) : (
              <p className="job-openings-empty">
                No openings in this category right now. Check back soon!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ===== JOIN / ALERTS / NETWORK SECTION ===== */}
      <section className="cta-cards-section">
        <div className="cta-cards-container">
          {/* Card 1 — Join Us */}
          <div className="cta-card">
            <div className="cta-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" width="120" height="96">
                <defs><style>{`.ci1{fill:none;stroke:#351a55;stroke-miterlimit:10;stroke-width:2.5px;}`}</style></defs>
                <circle className="ci1" cx="18" cy="27" r="4" />
                <circle className="ci1" cx="32" cy="13" r="8.5" />
                <circle className="ci1" cx="70" cy="50" r="8" />
                <circle className="ci1" cx="36" cy="49" r="6.5" />
                <circle className="ci1" cx="53" cy="32" r="6.5" />
                <circle className="ci1" cx="70" cy="16" r="6.5" />
                <line className="ci1" x1="59" y1="38" x2="64" y2="44" />
                <line className="ci1" x1="37" y1="20" x2="47" y2="27" />
                <line className="ci1" x1="47" y1="38" x2="41" y2="44" />
                <line className="ci1" x1="64" y1="22" x2="58" y2="28" />
                <line className="ci1" x1="24" y1="20" x2="19" y2="24" />
              </svg>
            </div>
            <h3 className="cta-title">Join Us</h3>
            <p className="cta-para">Explore open roles that match your interests and skills.</p>
            <div className="cta-links">
              <h5>Join JMN Infotech</h5>
              <a href="#postings" className="cta-link">Job Postings &rsaquo;</a>
            </div>
          </div>

          {/* Card 2 — Get Job Alerts */}
          <div className="cta-card">
            <div className="cta-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" width="120" height="96">
                <defs><style>{`.ci2{fill:none;stroke:#351a55;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5px;}`}</style></defs>
                <path className="ci2" d="M48,47h-19c-1.4,0-2.6-1.2-2.6-2.6V28.8c0-1.4,1.2-2.6,2.6-2.6h19V47z" />
                <path className="ci2" d="M27,43.2c-2.9,0-5.2-2.3-5.2-5.2v-2.6c0-2.9,2.3-5.2,5.2-5.2" />
                <polyline className="ci2" points="41 47 45.8 64.4 36.2 64.4 31.4 47" />
                <polyline className="ci2" points="48 26.2 74.6 13.5 74.6 11 80 11 80 62 74.6 62 74.6 59.5 48 47" />
              </svg>
            </div>
            <h3 className="cta-title">Get Job Alerts</h3>
            <p className="cta-para">Receive notifications when we have open roles and other relevant career news.</p>
            <div className="cta-links">
              <a href="#register" className="cta-link">Register &rsaquo;</a>
            </div>
          </div>

          {/* Card 3 — Join Our Talent Network */}
          <div className="cta-card">
            <div className="cta-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" width="120" height="96">
                <defs><style>{`.ci3{fill:none;stroke:#351a55;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5px;}`}</style></defs>
                <line className="ci3" x1="50" y1="28" x2="50" y2="37" />
                <line className="ci3" x1="50" y1="43" x2="50" y2="56" />
                <line className="ci3" x1="50" y1="12" x2="50" y2="21" />
                <path className="ci3" d="M50,21c.7-.6,1.7-1,2.8-1c2.4,0,4.3,1.9,4.3,4.3s-1.9,4.3-4.3,4.3-2-.4-2.8-1" />
                <path className="ci3" d="M50,43c-.7.6-1.7,1-2.8,1c-2.4,0-4.3-1.9-4.3-4.3s1.9-4.3,4.3-4.3,2,.4,2.8,1" />
                <line className="ci3" x1="43" y1="56" x2="57" y2="56" />
                <path className="ci3" d="M43,63.4c0,1.4,1.1,2.5,2.5,2.5h.2c1.2,0,2.2.6,2.8,1.5.5.6,1.2,1,2,1s1.5-.4,2-1c.7-.9,1.7-1.5,2.8-1.5h.2c1.4,0,2.5-1.1,2.5-2.5v-7.4c0-4.6,1.8-9.3,5.3-12.8c7.5-7.5,7-20.2-1.5-27c-6.5-5.3-16-5.3-22.5,0c-8.5,6.9-9,19.5-1.5,27c3.5,3.5,5.3,8.2,5.3,12.8v7.4" />
                <line className="ci3" x1="50" y1="4" x2="50" y2="10" />
                <line className="ci3" x1="65" y1="8" x2="62" y2="13" />
                <line className="ci3" x1="75" y1="18" x2="70" y2="21" />
                <line className="ci3" x1="79" y1="32" x2="73" y2="32" />
                <line className="ci3" x1="75" y1="46" x2="70" y2="43" />
                <line className="ci3" x1="25" y1="46" x2="30" y2="43" />
                <line className="ci3" x1="21" y1="32" x2="27" y2="32" />
                <line className="ci3" x1="25" y1="18" x2="30" y2="21" />
                <line className="ci3" x1="35" y1="8" x2="38" y2="13" />
              </svg>
            </div>
            <h3 className="cta-title">Join Our Talent Network</h3>
            <p className="cta-para">Join our Talent Network to stay connected and enhance your job search—apply or simply share your info!</p>
            <div className="cta-links">
              <a href="#talent" className="cta-link">Join Now &rsaquo;</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOLLOW US SECTION ===== */}
      <section className="follow-section">
        <div className="follow-container">
          <p className="follow-heading">Follow us on</p>
          <div className="follow-icons">
            <a href="#" aria-label="Facebook" className="follow-link">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="white">
                <path d="M29 0H3A3 3 0 0 0 0 3v26a3 3 0 0 0 3 3h13V20h-4v-5h4v-3.5C16 7.6 18.3 5 22 5c1.7 0 3.5.3 3.5.3V9H23c-1.9 0-2.5 1.2-2.5 2.4V15h4.3l-.7 5H20.5v12H29a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="follow-link">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="2">
                <rect x="2" y="2" width="28" height="28" rx="7" />
                <circle cx="16" cy="16" r="6" />
                <circle cx="23.5" cy="8.5" r="1.5" fill="white" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="follow-link">
              <svg width="42" height="40" viewBox="0 0 36 32" fill="white">
                <path d="M34.3 5.4A4.4 4.4 0 0 0 31.2 2C28.5 1 18 1 18 1S7.5 1 4.8 2A4.4 4.4 0 0 0 1.7 5.4C1 8.2 1 16 1 16s0 7.8.7 10.6A4.4 4.4 0 0 0 4.8 30C7.5 31 18 31 18 31s10.5 0 13.2-1a4.4 4.4 0 0 0 3.1-3.4C35 23.8 35 16 35 16s0-7.8-.7-10.6zM14 22V10l9 6-9 6z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="follow-link">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="white">
                <path d="M29 0H3A3 3 0 0 0 0 3v26a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3zM10 26H5V12h5v14zm-2.5-16a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM27 26h-5v-7c0-1.7-.6-2.8-2-2.8-1.1 0-1.7.7-2 1.4-.1.3-.1.7-.1 1.1V26h-5V12h5v2c.7-1 1.8-2.5 4.3-2.5C25 11.5 27 13.2 27 17.8V26z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== INCLUSION SECTION ===== */}
      <section
        className="inclusion-section"
        style={{ backgroundImage: `url(${purpose})` }}
      >
        <div className="inclusion-overlay"></div>
        <div className="inclusion-content">
          <p className="inclusion-line">Inclusion with Purpose,</p>
          <p className="inclusion-line">Equitable by Design,</p>
          <p className="inclusion-line">Equal Opportunity.</p>
          <p className="inclusion-sub">
            <em>
              We aim to create an equitable workplace for all, where each
              individual is treated with fairness and respect.
            </em>
          </p>
        </div>
      </section>

      {/* ===== LEGAL DISCLAIMER ===== */}
      <section className="legal-section">
        <div className="legal-container">
          <p>
            If you encounter any suspicious mail, advertisements, or persons who
            offer jobs at JMN Infotech, please email us at{" "}
            <a href="mailto:careers@jmninfotech.com">careers@jmninfotech.com</a>
            . Do not email your resume to this ID as it is not monitored for
            resumes and career applications.
          </p>
          <p>
            Any complaints or concerns regarding unethical/unfair hiring
            practices should be directed to our HR team.
          </p>
          <p>
            We are an Equal Opportunity Employer. All qualified applicants will
            receive consideration for employment without regard to race, color,
            caste, creed, religion, gender, marital status, age, ethnic and
            national origin, gender identity, gender expression, sexual
            orientation, political orientation, disability status, protected
            veteran status, or any other characteristic protected by law.
          </p>
        </div>
      </section>
    </>
  );
};

export default Career;