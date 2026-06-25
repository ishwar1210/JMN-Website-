import { useEffect, useMemo, useRef, useState } from "react";
import type { HomeData } from "../../services/homeService";
import { getHomeData } from "../../services/homeService";
import { clientService, type Client } from "../../services/clientService";
import { Container, Row, Col } from "react-bootstrap";
import { baseUrl } from "../../api/axiosInstance";
import "../../styles/Home/Home.css";
import companyOverviewBg from "../../assets/images/company-overview-bg.jpg";
import rocketIcon from "../../assets/images/imgi_7_startup.svg";
import appIcon from "../../assets/images/imgi_8_mobile.svg";
import computerIcon from "../../assets/images/imgi_9_computers.svg";
import globeIcon from "../../assets/images/imgi_10_world.svg";
import dealIcon from "../../assets/images/imgi_11_deal.svg";
import teamIcon from "../../assets/images/imgi_12_team.svg";

interface StatItem {
  id: number;
  icon: string;
  value: string;
  label: string;
  className: string;
  isPercent: boolean;
}

const Home = () => {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const clientsRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const [clientsVisible, setClientsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState<number[]>([]);
  // Scroll-driven marquee refs
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHomeData();
        if (response.success && response.data.length > 0) {
          setHomeData(response.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      }
    };
    const fetchClients = async () => {
      try {
        const data = await clientService.getAll();
        setClients(data);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    };
    fetchData();
    fetchClients();
  }, []);

  // IntersectionObserver — triggers wave animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setClientsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (clientsRef.current) observer.observe(clientsRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll-driven horizontal marquee
  useEffect(() => {
    if (!clientsRef.current || !marqueeTrackRef.current) return;

    let lastScrollY = window.scrollY;
    let currentX = 0;
    let targetX = 0;
    let halfWidth = 0;

    const getTrackHalfWidth = () => {
      if (!marqueeTrackRef.current) return 0;
      return marqueeTrackRef.current.scrollWidth / 2;
    };

    const animate = () => {
      // Smooth lerp toward target
      currentX += (targetX - currentX) * 0.07;

      // Seamless loop: wrap around when past half
      halfWidth = getTrackHalfWidth();
      if (halfWidth > 0) {
        currentX = ((currentX % halfWidth) + halfWidth) % halfWidth;
        targetX = ((targetX % halfWidth) + halfWidth) % halfWidth;
      }

      if (marqueeTrackRef.current) {
        marqueeTrackRef.current.style.transform = `translateX(-${currentX}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onScroll = () => {
      const section = clientsRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;

      // Only move when section is in/near viewport
      if (rect.bottom < -100 || rect.top > viewH + 100) return;

      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      // Speed multiplier — bigger = faster scroll
      targetX += delta * 1.8;
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [clients]); // re-run when clients load

  const buildStats = (data: HomeData): StatItem[] => [
    {
      id: 1,
      icon: rocketIcon,
      value: String(data.company_exp),
      label: "Years\nExperience",
      className: "stat-card-blue",
      isPercent: false,
    },
    {
      id: 2,
      icon: appIcon,
      value: String(data.apps_dev),
      label: "Apps\nDeveloped",
      className: "stat-card-pink",
      isPercent: false,
    },
    {
      id: 3,
      icon: computerIcon,
      value: String(data.project_dev),
      label: "Projects\nDelivered",
      className: "stat-card-cyan",
      isPercent: false,
    },
    {
      id: 4,
      icon: globeIcon,
      value: String(data.countries_served),
      label: "Countries\nServed",
      className: "stat-card-lime",
      isPercent: false,
    },
    {
      id: 5,
      icon: dealIcon,
      value: data.client_satisfaction_percent,
      label: "Client\nSatisfaction",
      className: "stat-card-indigo",
      isPercent: true,
    },
    {
      id: 6,
      icon: teamIcon,
      value: String(data.talented_squad),
      label: "Talented\nSquad",
      className: "stat-card-orange",
      isPercent: false,
    },
  ];

  const stats = useMemo(() => (homeData ? buildStats(homeData) : []), [homeData]);

  useEffect(() => {
    if (stats.length === 0) return;

    let animationFrame = 0;
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          observer.disconnect();

          const duration = 1600;
          const targets = stats.map((stat) => Number.parseInt(stat.value, 10));
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            setAnimatedStats(
              targets.map((target) => Math.round(target * easedProgress)),
            );
            if (progress < 1) animationFrame = requestAnimationFrame(tick);
          };
          animationFrame = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.35 },
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [stats]);

  const getWaveY = (index: number, total: number) => {
    if (total === 0) return 0;
    // We want a beautiful smooth sine wave, roughly 1 full wave every 5.5 cards
    const cycles = Math.max(1, Math.round(total / 5.5));
    // Calculate frequency so the wave perfectly repeats exactly after 'total' items
    const freq = (cycles * 2 * Math.PI) / total;
    const amplitude = 60; // 60px up and down
    return Math.sin(index * freq) * amplitude;
  };

  const getLogoUrl = (logoPath: string) => {
    if (!logoPath) return "";
    if (logoPath.startsWith("http")) return logoPath;
    return `${baseUrl}${logoPath}`;
  };

  const getVideoSrc = () => {
    if (homeData?.home_video) {
      return homeData.home_video.startsWith("http")
        ? homeData.home_video
        : `${baseUrl}${homeData.home_video}`;
    }
    return "";
  };

  return (
    <>
      {/* ===== HERO VIDEO SECTION ===== */}
      <section className="hero-video-section">
        {homeData?.home_video ? (
          <video
            className="hero-video"
            src={getVideoSrc()}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <div className="hero-video-placeholder" />
        )}
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
                <h2>{homeData?.home_title || "JMN Infotech Private Limited"}</h2>
                <p>
                  {homeData?.home_desc ||
                    "Global Technology Partner for Digital Transformation and Industry 4.0 Solutions RFID | IoT | AI | Enterprise Software | Web & Mobile Applications | Smart Governance | Digital Twin"}
                </p>
                <h3>Let's Start a New Project Together</h3>
                <a href="#" className="quote-button">
                  Request A Quote <span>›</span>
                </a>
              </div>
            </Col>
            <Col lg={6} md={12}>
              <Row className="stats-grid" ref={statsRef}>
                {stats.map((stat, index) => (
                  <Col key={stat.id} lg={6} xl={4} md={6} sm={6} xs={12} className="mb-3">
                    <div className={`stat-card ${stat.className}`}>
                      <div className="stat-icon">
                        <img src={stat.icon} alt="" aria-hidden="true" />
                      </div>
                      <strong>
                        {animatedStats[index] ?? 0}
                        {stat.isPercent ? "%" : "+"}
                      </strong>
                      <p>
                        {stat.label.split("\n").map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < stat.label.split("\n").length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== CLIENTS SECTION ===== */}
      <section className="clients-section" ref={clientsRef}>
        <div className="clients-header">
          <h2>Our Clients</h2>
        </div>
        <div className={`clients-marquee-wrapper ${clientsVisible ? "clients-wave-visible" : ""}`}>
          <div className="clients-marquee-track" ref={marqueeTrackRef}>
            {/* First set */}
            {clients.map((client, index) => {
              const yOffset = getWaveY(index, clients.length);
              return (
                <div
                  className="client-circle-card"
                  key={`a-${client.id}`}
                  style={{ 
                    "--wave-delay": `${index * 60}ms`,
                    "--wave-y": `${yOffset}px`
                  } as React.CSSProperties}
                >
                  <img
                    src={getLogoUrl(client.logo_image)}
                    alt={client.client_name}
                    title={client.client_name}
                  />
                </div>
              );
            })}
            {/* Duplicate set for seamless loop */}
            {clients.map((client, index) => {
              // We use index + clients.length to continue the wave mathematically
              const yOffset = getWaveY(index + clients.length, clients.length);
              return (
                <div
                  className="client-circle-card"
                  key={`b-${client.id}`}
                  style={{ 
                    "--wave-delay": `${(clients.length + index) * 60}ms`,
                    "--wave-y": `${yOffset}px`
                  } as React.CSSProperties}
                >
                  <img
                    src={getLogoUrl(client.logo_image)}
                    alt={client.client_name}
                    title={client.client_name}
                  />
                </div>
              );
            })}
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
                  <input
                    type="text"
                    placeholder="Full Name"
                    aria-label="Full Name"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    aria-label="Email Address"
                  />
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    aria-label="Contact Number"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    aria-label="Subject"
                  />
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