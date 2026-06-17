import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container } from 'react-bootstrap';
import '../../../styles/Navbar/Navbar.css';
import logo from '../../../assets/images/JMN.png';
import axiosInstance from '../../../api/axiosInstance';
import { ENDPOINTS } from '../../../api/endpoint';

interface WhatWeDoItem {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string | null;
  sort_order: number;
  is_active: number;
}

interface WhatWeDoData {
  solutions: WhatWeDoItem[];
  products: WhatWeDoItem[];
  industries: WhatWeDoItem[];
}

interface TechnologyItem {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  is_active: number;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [technologies, setTechnologies] = useState<TechnologyItem[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [whatWeDoData, setWhatWeDoData] = useState<WhatWeDoData>({
    solutions: [],
    products: [],
    industries: [],
  });
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll  = () => setIsScrolled(window.scrollY > 50);
    const handleResize  = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('scroll',  handleScroll);
    window.addEventListener('resize',  handleResize);
    return () => {
      window.removeEventListener('scroll',  handleScroll);
      window.removeEventListener('resize',  handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchWhatWeDoData = async () => {
      try {
        const response = await axiosInstance.get(ENDPOINTS.WHATWEDO);
        if (response.data.success) setWhatWeDoData(response.data.data);
      } catch (error) {
        console.error('Error fetching What We Do data:', error);
      }
    };
    fetchWhatWeDoData();
  }, []);

  useEffect(() => {
  const fetchTechnologies = async () => {
    try {
      const response = await axiosInstance.get(
        ENDPOINTS.TECHNOLOGIES
      );

      if (response.data.success) {
        setTechnologies(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching technologies:', error);
    }
  };

  fetchTechnologies();
}, []);

  const handleMouseEnter = (menu: string) => {
    if (isMobile) return;
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 200);
  };


  const closeAll = () => {
    setIsExpanded(false);
    setActiveDropdown(null);
  };

  return (
    <BsNavbar
      expand="lg"
      fixed="top"
      expanded={isExpanded}
      onToggle={(expanded) => setIsExpanded(expanded)}
      className={`custom-navbar ${isScrolled ? 'scrolled' : ''} ${isExpanded ? 'navbar-expanded' : ''}`}
    >
      <Container fluid className="px-3 px-md-5">

        {/* ── Logo (left) ── */}
        <BsNavbar.Brand as={Link} to="/" className="navbar-logo">
          <img src={logo} alt="JMN" />
        </BsNavbar.Brand>

        {/* ── Mobile Toggle ── */}
        <BsNavbar.Toggle aria-controls="main-navbar-nav" className="border-0" />

        {/* ── Collapsible Content ── */}
        <BsNavbar.Collapse id="main-navbar-nav">

          {/* Center nav links — mx-auto pushes them to center */}
          <Nav className="mx-auto align-items-lg-center gap-lg-4 gap-2">

            {/* What We Do — Mega Menu */}
            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => handleMouseEnter('whatwedo')}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className="nav-item-link nav-link"
                role="button"
              >
                What We Do <span className="dropdown-arrow">▾</span>
              </span>
              {activeDropdown === 'whatwedo' && (
                <div className="mega-dropdown">
                  <div className="mega-dropdown-inner">
                    <div className="mega-col">
                      <h6 className="mega-col-title">Solutions</h6>
                      <ul>
                        {whatWeDoData.solutions.map((item) => (
                          <li key={item.id}>
                            <Link to={`/what-we-do/solutions/${item.slug}`} onClick={closeAll}>{item.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mega-col">
                      <h6 className="mega-col-title">Products</h6>
                      <ul>
                        {whatWeDoData.products.map((item) => (
                          <li key={item.id}>
                            <Link to={`/what-we-do/products/${item.slug}`} onClick={closeAll}>{item.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mega-col">
                      <h6 className="mega-col-title">Industries</h6>
                      <ul>
                        {whatWeDoData.industries.map((item) => (
                          <li key={item.id}>
                            <Link to={`/what-we-do/industries/${item.slug}`} onClick={closeAll}>{item.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Technologies — Simple Dropdown */}
            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => handleMouseEnter('technologies')}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className="nav-item-link nav-link"
                role="button"
              >
                Technologies <span className="dropdown-arrow">▾</span>
              </span>
              {activeDropdown === 'technologies' && (
                <div className="dropdown-menu-custom">
                  <ul>
                      {technologies.map((item) => (
                        <li key={item.id}>
                            <Link
                              to={`/technologies/${item.slug}`}
                              onClick={closeAll}
                            >
                          {item.name}
                            </Link>
                        </li>
                        ))}
                    </ul>
                </div>
              )}
            </div>

            {/* Career */}
            <Nav.Link as={Link} to="/career"  className="nav-item-link" onClick={closeAll}>Career</Nav.Link>

            {/* Company */}
            <Nav.Link as={Link} to="/company" className="nav-item-link" onClick={closeAll}>Company</Nav.Link>

            {/* Contact Us */}
            <Nav.Link as={Link} to="/contact" className="nav-item-link" onClick={closeAll}>Contact Us</Nav.Link>

          </Nav>

          {/* Right: phone + quote */}
          {/* <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <div className="phone-icon-container">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <Link to="/contact" className="quote-btn" onClick={closeAll}>
              Request A Quote
            </Link>
          </div> */}

        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;