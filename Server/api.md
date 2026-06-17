# JMN Website - API Documentation

## Base URL

```
http://localhost:3000/api
```

---

## What We Do APIs

### 1. GET All Items (Grouped by Category)

**Endpoint:** `GET /api/whatwedo`

**Response:**
```json
{
  "success": true,
  "data": {
    "solutions": [
      {
        "id": 1,
        "name": "AIDC",
        "slug": "aidc",
        "category": "solutions",
        "description": null,
        "sort_order": 1,
        "is_active": 1,
        "created_at": "2026-06-01T10:00:00.000Z",
        "updated_at": "2026-06-01T10:00:00.000Z"
      }
    ],
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

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "AIDC",
      "slug": "aidc",
      "category": "solutions",
      "description": null,
      "sort_order": 1,
      "is_active": 1,
      "created_at": "2026-06-01T10:00:00.000Z",
      "updated_at": "2026-06-01T10:00:00.000Z"
    }
  ]
}
```

---

### 3. GET Single Item by Slug

**Endpoint:** `GET /api/whatwedo/:slug`

**Example:** `GET /api/whatwedo/aidc`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "AIDC",
    "slug": "aidc",
    "category": "solutions",
    "description": null,
    "sort_order": 1,
    "is_active": 1,
    "created_at": "2026-06-01T10:00:00.000Z",
    "updated_at": "2026-06-01T10:00:00.000Z"
  }
}
```

---

### 4. POST Create New Item

**Endpoint:** `POST /api/whatwedo`

**Headers:**
```
Content-Type: application/json
```

**Payload:**
```json
{
  "name": "New Solution",
  "slug": "new-solution",
  "category": "solutions",
  "description": "This is a new solution description",
  "sort_order": 17
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | ✅ | Item ka display name |
| slug | string | ✅ | URL friendly unique identifier |
| category | string | ✅ | `solutions` / `products` / `industries` |
| description | string | ❌ | Item ki description |
| sort_order | number | ❌ | Display order (default: 0) |

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 32,
    "name": "New Solution",
    "slug": "new-solution",
    "category": "solutions",
    "description": "This is a new solution description",
    "sort_order": 17
  },
  "message": "Item created successfully"
}
```

**Error Responses:**

- Missing required fields (400):
```json
{
  "success": false,
  "message": "name, slug, and category are required"
}
```

- Invalid category (400):
```json
{
  "success": false,
  "message": "Invalid category. Use: solutions, products, or industries"
}
```

- Duplicate slug (409):
```json
{
  "success": false,
  "message": "Slug already exists"
}
```

---

### 5. PUT Update Item

**Endpoint:** `PUT /api/whatwedo/:id`

**Example:** `PUT /api/whatwedo/1`

**Headers:**
```
Content-Type: application/json
```

**Payload:**
```json
{
  "name": "AIDC Updated",
  "slug": "aidc",
  "category": "solutions",
  "description": "Updated description for AIDC",
  "sort_order": 1,
  "is_active": 1
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | ✅ | Item ka display name |
| slug | string | ✅ | URL friendly unique identifier |
| category | string | ✅ | `solutions` / `products` / `industries` |
| description | string | ❌ | Item ki description |
| sort_order | number | ❌ | Display order (default: 0) |
| is_active | number | ❌ | 1 = active, 0 = inactive (default: 1) |

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "AIDC Updated",
    "slug": "aidc",
    "category": "solutions",
    "description": "Updated description for AIDC",
    "sort_order": 1,
    "is_active": 1,
    "created_at": "2026-06-01T10:00:00.000Z",
    "updated_at": "2026-06-02T12:00:00.000Z"
  },
  "message": "Item updated successfully"
}
```

**Error Responses:**

- Item not found (404):
```json
{
  "success": false,
  "message": "Item not found"
}
```

- Duplicate slug (409):
```json
{
  "success": false,
  "message": "Slug already exists for another item"
}
```

---

### 6. DELETE Item

**Endpoint:** `DELETE /api/whatwedo/:id`

**Example:** `DELETE /api/whatwedo/1`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Item not found"
}
```

---

## WhatWeDo Page API (Single Query - Billing Optimized)

### 1. GET WhatWeDo Page (Complete Page Data)

**Endpoint:** `GET /api/whatwedo-page`

**Description:** Fetches the entire WhatWeDo page in a single database query. Returns banner, expertise, What We Think cards (with images), and What We Do items (with images). This is the main page API — minimal database calls for low AWS billing.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "banner_title": "Automotive",
    "banner_image": "/images/whatwedo/automotive-banner.jpg",
    "expertise_header": "Our Expertise",
    "expertise_lead": "Leverage breakthrough technologies to meet customer needs...",
    "expertise_body": "As digital transformation and connectivity alter many facets...",
    "think_header": "What We Think",
    "think_description": null,
    "think_cards": [
      {
        "id": 1,
        "image": "/images/whatwedo/think-1.jpg",
        "title": "Wipro Intelligence™: Automotive Business Trends"
      },
      {
        "id": 2,
        "image": "/images/whatwedo/think-2.jpg",
        "title": "Charging Ahead: Ensuring Superior Customer Experience...",
        "excerpt": "According to the International Energy Agency (IEA)..."
      },
      {
        "id": 3,
        "image": "/images/whatwedo/think-3.jpg",
        "title": "Fast Forward",
        "excerpt": "The automotive industry's future..."
      },
      {
        "id": 4,
        "image": "/images/whatwedo/think-4.jpg",
        "title": "The Digital Control Tower..."
      }
    ],
    "do_header": "What We Do",
    "do_description": null,
    "do_items": [
      {
        "id": 1,
        "image": "/images/whatwedo/do-1.jpg",
        "title": "Autosol-SAP",
        "description": "Easy insights into future business operations"
      }
    ],
    "is_active": 1,
    "created_at": "2026-06-17T05:00:50.000Z",
    "updated_at": "2026-06-17T05:00:50.000Z"
  }
}
```

### 2. PUT Update WhatWeDo Page

**Endpoint:** `PUT /api/whatwedo-page/:id`

**Example:** `PUT /api/whatwedo-page/1`

**Headers:**
```
Content-Type: application/json
```

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
