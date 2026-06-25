
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import Home from './pages/Home/Home';
import Career from './pages/Career/Career';
import WhatWeDo from './pages/WhatWeDo/WhatWeDo';
import Contact from './pages/Contact/Contact';
import Company from './pages/Company/Company';
import AdminLayout from './admin/Layout/Adminlayout';
import AdminDashboard from './admin/Dashboard/AdminDashboard';
import AdminHome from './admin/Home/Adminhome';
import AdminWhatWeDo from './admin/WhatWeDo/AdminWhatWeDo';
import AdminTechnologies from './admin/Technologies/AdminTechnologies';
import AdminCareer from './admin/Career/AdminCareer';
import AdminContact from './admin/Contact/AdminContact';
import AdminClients from './admin/Clients/Client';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes - with Navbar and footer */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="career" element={<Career />} />
          <Route path="what-we-do/:id" element={<WhatWeDo />} />
          <Route path="contact" element={<Contact />} />
          <Route path="company" element={<Company />} />
        </Route>

        {/* Admin routes - prefixed with /admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="what-we-do" element={<AdminWhatWeDo />} />
          <Route path="technologies" element={<AdminTechnologies />} />
          <Route path="career" element={<AdminCareer />} />
          <Route path="contact" element={<AdminContact />} />
          <Route path="clients" element={<AdminClients />} />
        </Route>
      </Routes>
    </Router>
  );
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer className="site-footer">
        <p>Copyright © 2012-2026 JMN Infotech. All rights reserved.</p>
        <p>Designed and Developed by Ishwar khairnar</p>
      </footer>
    </>
  );
}

export default App;
