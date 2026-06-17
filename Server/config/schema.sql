-- Database create karein
CREATE DATABASE IF NOT EXISTS jmn;
USE jmn;

-- What We Do table
CREATE TABLE IF NOT EXISTS whatwedo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  category ENUM('solutions', 'products', 'industries') NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Solutions data insert
INSERT INTO whatwedo (name, slug, category, sort_order) VALUES
('AIDC', 'aidc', 'solutions', 1),
('Applications', 'applications', 'solutions', 2),
('Track & Trace', 'track-trace', 'solutions', 3),
('Asset Intelligence', 'asset-intelligence', 'solutions', 4),
('Warehouse Management', 'warehouse-management', 'solutions', 5),
('Manufacturing Intelligence', 'manufacturing-intelligence', 'solutions', 6),
('IOT', 'iot', 'solutions', 7),
('Solid Waste Management', 'solid-waste-management', 'solutions', 8),
('Access Control', 'access-control', 'solutions', 9),
('AI Vision Platform', 'ai-vision-platform', 'solutions', 10),
('Enterprise CCTV Surveillance Technology', 'cctv-surveillance', 'solutions', 11),
('RFID Based Library Management System', 'rfid-library', 'solutions', 12),
('Unmanned Weighbridge Automation', 'weighbridge-automation', 'solutions', 13),
('Fleet Management', 'fleet-management', 'solutions', 14),
('Vehicle Tracking', 'vehicle-tracking', 'solutions', 15),
('Retail & Ecommerce', 'retail-ecommerce', 'solutions', 16);

-- Products data insert
INSERT INTO whatwedo (name, slug, category, sort_order) VALUES
('HRMS', 'hrms', 'products', 1),
('Payroll & Attendance', 'payroll-attendance', 'products', 2),
('VMS', 'vms', 'products', 3),
('CMS', 'cms', 'products', 4),
('Asset Management', 'asset-management', 'products', 5),
('Tool Management', 'tool-management', 'products', 6),
('Biomedical', 'biomedical', 'products', 7),
('DWS (Dynamic Weight Management)', 'dws', 'products', 8);

-- Industries data insert
INSERT INTO whatwedo (name, slug, category, sort_order) VALUES
('Banking', 'banking', 'industries', 1),
('Manufacturing', 'manufacturing', 'industries', 2),
('Healthcare', 'healthcare', 'industries', 3),
('Education', 'education', 'industries', 4),
('Government', 'government', 'industries', 5),
('Automobile', 'automobile', 'industries', 6),
('Logistics', 'logistics', 'industries', 7);

CREATE TABLE IF NOT EXISTS technologies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT DEFAULT NULL,
  icon VARCHAR(255) DEFAULT NULL,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed data (image ke hisaab se)
INSERT INTO technologies (name, slug, sort_order) VALUES
  ('RFID', 'rfid', 1),
  ('RFID IOT', 'rfid-iot', 2),
  ('AIML', 'aiml', 3),
  ('AI Vision', 'ai-vision', 4),
  ('Barcode', 'barcode', 5),
  ('GPS', 'gps', 6),
  ('PLC & Scada', 'plc-scada', 7);