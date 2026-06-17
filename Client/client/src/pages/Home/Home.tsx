import { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import companyOverviewBg from '../../assets/images/company-overview-bg.jpg';
import rocketIcon from '../../assets/images/imgi_7_startup.svg';
import appIcon from '../../assets/images/imgi_8_mobile.svg';
import computerIcon from '../../assets/images/imgi_9_computers.svg';
import globeIcon from '../../assets/images/imgi_10_world.svg';
import dealIcon from '../../assets/images/imgi_11_deal.svg';
import teamIcon from '../../assets/images/imgi_12_team.svg';
import clientLogoJmn from '../../assets/images/JMN.png';
// import clientLogoShah from '../../assets/images/imgi_1_stechlogo.jpeg';
import clientLogoMsme from '../../assets/images/imgi_38_common-msme.jpeg';
import clientLogoBadgeA from '../../assets/images/imgi_34_badges-a.jpeg';
import clientLogoBadgeB from '../../assets/images/imgi_35_badges-b.jpeg';
import clientLogoBadgeC from '../../assets/images/imgi_36_badges-c.jpeg';
import clientLogoBadgeD from '../../assets/images/imgi_37_badges-d.jpeg';
import heroBannerVideo from '../../assets/images/hero-banner.mp4';
import '../../styles/Home/Home.css';
import { Row, Col } from 'react-bootstrap';

const stats = [
  { id: 1, icon: rocketIcon,   value: '12+',  label: 'Years\nExperience',    className: 'stat-card-blue'   },
  { id: 2, icon: appIcon,      value: '50+',  label: 'Apps\nDeveloped',      className: 'stat-card-pink'   },
  { id: 3, icon: computerIcon, value: '99%',  label: 'Projects\nDelivered',  className: 'stat-card-cyan'   },
  { id: 4, icon: globeIcon,    value: '10+',  label: 'Countries\nServed',    className: 'stat-card-lime'   },
  { id: 5, icon: dealIcon,     value: '100%', label: 'Client\nSatisfaction', className: 'stat-card-indigo' },
  { id: 6, icon: teamIcon,     value: '5+',   label: 'Talented\nSquad',      className: 'stat-card-orange' },
];

const clientLogos = [
  { id: 1, image: clientLogoJmn,    name: 'JMN Infotech'      },
  { id: 3, image: clientLogoMsme,   name: 'MSME'               },
  { id: 4, image: clientLogoBadgeA, name: 'Industry Leader'    },
  { id: 5, image: clientLogoBadgeB, name: 'Client Badge'       },
  { id: 6, image: clientLogoBadgeC, name: 'Client Badge'       },
  { id: 7, image: clientLogoBadgeD, name: 'Client Badge'       },
];

const Home = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState(() => stats.map(() => 0));

  useEffect(() => {
    let animationFrame = 0;
    let hasAnimated = false;

    const animateStats = () => {
      const duration = 1600;
      const targets  = stats.map((stat) => Number.parseInt(stat.value, 10));
      const start    = performance.now();

      const tick = (now: number) => {
        const progress      = Math.min((now - start) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setAnimatedStats(targets.map((target) => Math.round(target * easedProgress)));
        if (progress < 1) animationFrame = requestAnimationFrame(tick);
      };
      animationFrame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateStats();
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => { observer.disconnect(); cancelAnimationFrame(animationFrame); };
  }, []);

  return (
    <>
      {/* ===== HERO VIDEO SECTION ===== */}
      <section className="hero-video-section">
        <video className="hero-video" src={heroBannerVideo} autoPlay muted loop playsInline />
        <div className="hero-video-overlay" />
      </section>

      {/* ===== COMPANY OVERVIEW SECTION ===== */}
      <section
        className="company-overview-section"
        style={{ backgroundImage: `url(${companyOverviewBg})` }}
      >
        <Container>
          <Row className="company-overview-row align-items-center">
            <Col lg={6} md={12}>
              <div className="company-overview-content">
                <h2>JMN Infotech Mobile App & Web Development Company</h2>
                <p>
                  We specializes in development of mobile app, web development,
                  software developmnet, internet marketing and infrastructure
                  solution. Our mission is to bring convenience to people by
                  solving daily life problems and improving user experience with
                  new technologies and innovation. We provide professional,
                  tailor-made solutions to assist customers in adopting their
                  business and creating new opportunities with the cutting-edge
                  technologies.
                </p>
                <h3>Let's Start a New Project Together</h3>
                <a href="#" className="quote-button">
                  Request A Quote <span>›</span>
                </a>
              </div>
            </Col>
            <Col lg={6} md={12}>
              <div className="stats-grid" ref={statsRef}>
                {stats.map((stat, index) => (
                  <div key={stat.id} className={`stat-card ${stat.className}`}>
                    <div className="stat-icon">
                      <img src={stat.icon} alt="" aria-hidden="true" />
                    </div>
                    <strong>
                      {animatedStats[index]}
                      {stat.value.includes('%') ? '%' : '+'}
                    </strong>
                    <p>
                      {stat.label.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < stat.label.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== CLIENTS SECTION ===== */}
      <section className="clients-section">
        <Container>
          <div className="clients-header">
            <h2>Our Clients</h2>
          </div>
        </Container>
        <div className="clients-marquee" aria-label="Our client logos">
          <div className="clients-track">
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <div className="client-logo-card" key={`${client.id}-${index}`}>
                <img src={client.image} alt={client.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="home-contact-section">
        <Container>
          <div className="home-contact-panel">

            {/* Center mein sirf form */}
            <div className="home-contact-form-wrap">
              <p className="home-contact-eyebrow">CONTACT NOW</p>
              <h2>Have Question? Write a Message</h2>

              <form className="home-contact-form">
                <div className="home-contact-fields">
                  <input type="text"  placeholder="Full Name"      aria-label="Full Name"      />
                  <input type="email" placeholder="Email Address"  aria-label="Email Address"  />
                  <input type="tel"   placeholder="Contact Number" aria-label="Contact Number" />
                  <input type="text"  placeholder="Subject"        aria-label="Subject"        />
                </div>
                <textarea placeholder="Message" aria-label="Message"></textarea>
                <button type="submit">
                  Submit <span>&rsaquo;</span>
                </button>
                <p className="home-contact-note">
                  We hate spam, and we respect your privacy.
                </p>
              </form>
            </div>

          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;