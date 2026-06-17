-- ============================================================
-- New table: whatwedo_page
-- Single-row design for the WhatWeDo page
-- Stores all page content in JSON columns for minimal queries
-- ============================================================

CREATE TABLE IF NOT EXISTS whatwedo_page (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  -- Banner section
  banner_title VARCHAR(255) NOT NULL,
  banner_image VARCHAR(500) DEFAULT NULL,
  
  -- Our Expertise section
  expertise_header VARCHAR(255) DEFAULT NULL,
  expertise_lead TEXT DEFAULT NULL,
  expertise_body TEXT DEFAULT NULL,
  
  -- What We Think section (JSON: array of cards with image, title, excerpt)
  think_header VARCHAR(255) DEFAULT NULL,
  think_description TEXT DEFAULT NULL,
  think_cards JSON DEFAULT NULL,
  
  -- What We Do section (JSON: array of items with image, title, description)
  do_header VARCHAR(255) DEFAULT NULL,
  do_description TEXT DEFAULT NULL,
  do_items JSON DEFAULT NULL,
  
  -- Status & timestamps
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default seed data for the Automotive/WhatWeDo page
INSERT INTO whatwedo_page (
  banner_title, banner_image,
  expertise_header, expertise_lead, expertise_body,
  think_header, think_cards,
  do_header, do_items
) VALUES (
  -- Banner
  'Automotive',
  '/images/whatwedo/automotive-banner.jpg',
  
  -- Our Expertise
  'Our Expertise',
  'Leverage breakthrough technologies to meet customer needs of comfort, convenience, performance and enhanced safety',
  'As digital transformation and connectivity alter many facets of the Automotive Industry, Wipro works with clients to ensure they continue to innovate and remain at the forefront of change. Combining traditional solutions with the potential of Industry 4.0 technologies, we work with automotive manufacturers, OEMs and the extend supply chain to deliver vehicles that are safer and more enjoyable to drive.',
  
  -- What We Think
  'What We Think',
  '[{ "id": 1, "image": "/images/whatwedo/think-1.jpg", "title": "Wipro Intelligence™: Automotive Business Trends" }, { "id": 2, "image": "/images/whatwedo/think-2.jpg", "title": "Charging Ahead: Ensuring Superior Customer Experience through Enhanced EV Battery Lifecycle Management", "excerpt": "According to the International Energy Agency (IEA), the global EV market experienced an unprecedented inflection point..." }, { "id": 3, "image": "/images/whatwedo/think-3.jpg", "title": "Fast Forward", "excerpt": "The automotive industry''s future is no longer solely dependent on hardware. Today''s cars can contain as much embedded..." }, { "id": 4, "image": "/images/whatwedo/think-4.jpg", "title": "The Digital Control Tower: Why Modernizing Auto Dealer Portals Is a Strategic Imperative" }]',
  
  -- What We Do
  'What We Do',
  '[{ "id": 1, "image": "/images/whatwedo/do-1.jpg", "title": "Autosol-SAP", "description": "Easy insights into future business operations" }, { "id": 2, "image": "/images/whatwedo/do-2.jpg", "title": "Connected Cars (powered by Looking Glass and…)", "description": "Flashy? Useful? Futuristic?..." }, { "id": 3, "image": "/images/whatwedo/do-3.jpg", "title": "Digital Marketing", "description": "Digitizing Customer''s Journey" }, { "id": 4, "image": "/images/whatwedo/do-4.jpg", "title": "Dealer Management", "description": "Road-tested Dealer Ecosystem Management" }, { "id": 5, "image": "/images/whatwedo/do-5.jpg", "title": "AutoComm (Aftermarket parts E-commerce)", "description": "Digital model for..." }, { "id": 6, "image": "/images/whatwedo/do-6.jpg", "title": "Smart Manufacturing", "description": "Breakthrough, game-changing, disruptive" }, { "id": 7, "image": "/images/whatwedo/do-7.jpg", "title": "Automotive Innovation Center", "description": "Collaboration powering..." }, { "id": 8, "image": "/images/whatwedo/do-8.jpg", "title": "Wipro''s DDPS 2.0, powered by Dell, for...", "description": "Wipro''s DDPS 2.0: A..." }]'
);