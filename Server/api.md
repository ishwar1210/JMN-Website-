# JMN Website - API Documentation

## Base URL

```
http://localhost:3000/api
```

---

## What We Do APIs (Navbar List)

### 1. GET All Items (Grouped by Category)

**Endpoint:** `GET /api/whatwedo`

**Response:**
```json
{
  "success": true,
  "data": {
    "solutions": [...],
    "products": [...],
    "industries": [...]
  }
}
```

---

### 2. GET Items by Category

**Endpoint:** `GET /api/whatwedo/category/:category`

**Params:** `category` = `solutions` | `products` | `industries`

**Example:** `GET /api/whatwedo/category/solutions`

---

### 3. GET Single Item by Slug

**Endpoint:** `GET /api/whatwedo/:slug`

**Example:** `GET /api/whatwedo/aidc`

---

### 4. POST Create New Item

**Endpoint:** `POST /api/whatwedo`

**Payload:**
```json
{
  "name": "New Solution",
  "slug": "new-solution",
  "category": "solutions",
  "description": "...",
  "sort_order": 17
}
```

---

### 5. PUT Update Item

**Endpoint:** `PUT /api/whatwedo/:id`

---

### 6. DELETE Item

**Endpoint:** `DELETE /api/whatwedo/:id`

---

## WhatWeDo Page API (Single Query - Billing Optimized)

**Purpose:** Fetch complete WhatWeDo page (banner, expertise, think cards, do items) in **just 1 database query**.

### 1. GET WhatWeDo Page

**Endpoint:** `GET /api/whatwedo-page`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "banner_title": "Automotive",
    "banner_image": "/images/whatwedo/automotive-banner.jpg",
    "expertise_header": "Our Expertise",
    "expertise_lead": "Leverage breakthrough technologies...",
    "expertise_body": "As digital transformation and connectivity...",
    "think_header": "What We Think",
    "think_description": null,
    "think_cards": [
      { "id": 1, "image": "/images/whatwedo/think-1.jpg", "title": "Wipro Intelligence™: Automotive Business Trends" },
      { "id": 2, "image": "/images/whatwedo/think-2.jpg", "title": "Charging Ahead...", "excerpt": "According to the IEA..." },
      { "id": 3, "image": "/images/whatwedo/think-3.jpg", "title": "Fast Forward", "excerpt": "The automotive industry's future..." },
      { "id": 4, "image": "/images/whatwedo/think-4.jpg", "title": "The Digital Control Tower..." }
    ],
    "do_header": "What We Do",
    "do_description": null,
    "do_items": [
      { "id": 1, "image": "/images/whatwedo/do-1.jpg", "title": "Autosol-SAP", "description": "Easy insights..." }
    ],
    "is_active": 1,
    "created_at": "2026-06-17T05:00:50.000Z",
    "updated_at": "2026-06-17T05:00:50.000Z"
  }
}
```

---

### 2. POST Create New Page

**Endpoint:** `POST /api/whatwedo-page`

**Headers:** `Content-Type: application/json`

**Payload (all fields optional — defaults applied automatically):**
```json
{
  "banner_title": "Automotive",
  "banner_image": "/images/whatwedo/automotive-banner.jpg",
  "expertise_header": "Our Expertise",
  "expertise_lead": "Lead text...",
  "expertise_body": "Body text...",
  "think_header": "What We Think",
  "think_description": null,
  "think_cards": [
    { "id": 1, "image": "/images/think-1.jpg", "title": "Card 1", "excerpt": "Optional excerpt" }
  ],
  "do_header": "What We Do",
  "do_description": null,
  "do_items": [
    { "id": 1, "image": "/images/do-1.jpg", "title": "Item 1", "description": "Desc" }
  ]
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": { "id": 2 },
  "message": "Page created successfully"
}
```

---

### 3. PUT Update Page

**Endpoint:** `PUT /api/whatwedo-page/:id`

**Example:** `PUT /api/whatwedo-page/1`

**Payload (all fields optional):**
```json
{
  "banner_title": "Automotive Updated",
  "banner_image": "/images/whatwedo/new-banner.jpg",
  "expertise_header": "Our Expertise",
  "expertise_lead": "Updated lead text...",
  "expertise_body": "Updated body text...",
  "think_header": "What We Think",
  "think_description": "Optional description",
  "think_cards": [
    { "id": 1, "image": "/images/think-1.jpg", "title": "Card 1" }
  ],
  "do_header": "What We Do",
  "do_description": null,
  "do_items": [
    { "id": 1, "image": "/images/do-1.jpg", "title": "Item 1", "description": "Desc" }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| banner_title | string | ❌ | Page banner heading |
| banner_image | string | ❌ | Banner image path |
| expertise_header | string | ❌ | Expertise section heading |
| expertise_lead | string | ❌ | Expertise lead paragraph |
| expertise_body | string | ❌ | Expertise body text |
| think_header | string | ❌ | What We Think heading |
| think_description | string | ❌ | Optional description |
| think_cards | array | ❌ | Array of card objects (id, image, title, excerpt) |
| do_header | string | ❌ | What We Do heading |
| do_description | string | ❌ | Optional description |
| do_items | array | ❌ | Array of item objects (id, image, title, description) |

**Success Response (200):**
```json
{
  "success": true,
  "data": { ... },
  "message": "Page updated successfully"
}
```

---

### 4. DELETE Page

**Endpoint:** `DELETE /api/whatwedo-page/:id`

**Example:** `DELETE /api/whatwedo-page/1`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Page deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Page not found"
}
```

---

## Database Table Structure

### whatwedo (Navbar List - Existing Table)
```sql
CREATE TABLE whatwedo (
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
```

### whatwedo_page (Page Content - New Single-Query Table)
```sql
CREATE TABLE whatwedo_page (
  id INT AUTO_INCREMENT PRIMARY KEY,
  banner_title VARCHAR(255) NOT NULL,
  banner_image VARCHAR(500) DEFAULT NULL,
  expertise_header VARCHAR(255) DEFAULT NULL,
  expertise_lead TEXT DEFAULT NULL,
  expertise_body TEXT DEFAULT NULL,
  think_header VARCHAR(255) DEFAULT NULL,
  think_description TEXT DEFAULT NULL,
  think_cards JSON DEFAULT NULL,
  do_header VARCHAR(255) DEFAULT NULL,
  do_description TEXT DEFAULT NULL,
  do_items JSON DEFAULT NULL,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);