
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import Home from './pages/Home/Home';
import Career from './pages/Career/Career';
import WhatWeDo from './pages/WhatWeDo/WhatWeDo';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/career" element={<Career />} />
        <Route path="/what-we-do/*" element={<WhatWeDo />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <footer className="site-footer">
        <p>Copyright © 2012-2026 JMN Infotech. All rights reserved.</p>
        <p>Designed and Developed by Ishwar khairnar</p>
      </footer>
    </Router>
  );
}

export default App;
