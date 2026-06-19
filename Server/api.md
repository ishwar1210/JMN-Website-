# JMN Website API Documentation

## What We Do Endpoints

Base URL: `/api/whatwedo`

### 1. Get All Items
- **Method**: `GET`
- **URL**: `/`
- **Description**: Returns all items from the `whatwedo` table ordered by creation date (newest first).
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "Project Alpha",
        "slug": "project-alpha",
        "category": "Development",
        "created_at": "2026-06-19T04:30:00.000Z"
      }
    ]
  }
  ```

### 2. Get Single Item by ID
- **Method**: `GET`
- **URL**: `/:id`
- **Description**: Returns a single item matching the provided `id`.
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "Project Alpha",
      "slug": "project-alpha",
      "category": "Development",
      "created_at": "2026-06-19T04:30:00.000Z"
    }
  }
  ```
- **Response** (404 Not Found):
  ```json
  {
    "success": false,
    "message": "Item not found"
  }
  ```

### 3. Create Item
- **Method**: `POST`
- **URL**: `/`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Project Alpha",
    "slug": "project-alpha",
    "category": "Development"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "success": true,
    "message": "Item created successfully",
    "data": {
      "id": 1,
      "name": "Project Alpha",
      "slug": "project-alpha",
      "category": "Development"
    }
  }
  ```
- **Response** (400 Bad Request):
  ```json
  {
    "success": false,
    "message": "Please provide all required fields: name, slug, category"
  }
  ```
  *or*
  ```json
  {
    "success": false,
    "message": "Slug must be unique. This slug is already taken."
  }
  ```

### 4. Update Item
- **Method**: `PUT`
- **URL**: `/:id`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Project Alpha Updated",
    "slug": "project-alpha-updated",
    "category": "Research"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Item updated successfully",
    "data": {
      "id": "1",
      "name": "Project Alpha Updated",
      "slug": "project-alpha-updated",
      "category": "Research"
    }
  }
  ```

### 5. Delete Item
- **Method**: `DELETE`
- **URL**: `/:id`
- **Response** (200 OK):
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Item deleted successfully"
  }
  ```

---

## What We Do Detail Endpoints

Base URL: `/api/whatwedodetail`

### 1. Get All Detail Items
- **Method**: `GET`
- **URL**: `/`
- **Description**: Returns all detail items from the `whatwedodetail` table joined with aggregated `think_items` as JSON.
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "whatwedo_id": 1,
        "banner_image": "/uploads/1718816345678-test_banner.png",
        "banner_title": "Banner Title",
        "expertise_header": "Our Expertise",
        "expertise_desc": "Expertise Description",
        "created_at": "2026-06-19T04:35:00.000Z",
        "think_items": [
          {
            "id": 1,
            "image": "/uploads/1718816345679-test_think.png",
            "header": "How We Think Item 1",
            "desc": "Think Description 1",
            "sort_order": 1
          }
        ]
      }
    ]
  }
  ```

### 2. Get Single Detail Item by ID
- **Method**: `GET`
- **URL**: `/:id`
- **Description**: Returns a single detail item along with its ordered list of `think_items`.
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "whatwedo_id": 1,
      "banner_image": "/uploads/1718816345678-test_banner.png",
      "banner_title": "Banner Title",
      "expertise_header": "Our Expertise",
      "expertise_desc": "Expertise Description",
      "created_at": "2026-06-19T04:35:00.000Z",
      "think_items": [
        {
          "id": 1,
          "whatwedodetail_id": 1,
          "think_image": "/uploads/1718816345679-test_think.png",
          "think_header": "How We Think Item 1",
          "think_desc": "Think Description 1",
          "sort_order": 1,
          "created_at": "2026-06-19T04:35:00.000Z"
        }
      ]
    }
  }
  ```
- **Response** (404 Not Found):
  ```json
  {
    "success": false,
    "message": "Detail record not found"
  }
  ```

### 3. Create Detail Item (with dynamic images)
- **Method**: `POST`
- **URL**: `/`
- **Headers**: `Content-Type: multipart/form-data`
- **Request Body**:
  - `whatwedo_id` (Number, Required)
  - `banner_title` (String, Optional)
  - `expertise_header` (String, Optional)
  - `expertise_desc` (String, Optional)
  - `think_items` (JSON String of Array, e.g. `[{"header": "T1", "desc": "D1"}, {"header": "T2", "desc": "D2"}]`)
  - `banner_image` (File, Optional)
  - `think_image_0` (File, Optional - mapped to think item index 0)
  - `think_image_1` (File, Optional - mapped to think item index 1)
- **Response** (201 Created):
  ```json
  {
    "success": true,
    "message": "Detail record created successfully",
    "data": {
      "id": 1,
      "whatwedo_id": "1",
      "banner_image": "/uploads/1718816345678-test_banner.png",
      "banner_title": "Banner Title",
      "expertise_header": "Our Expertise",
      "expertise_desc": "Expertise Description",
      "think_items": [
        {
          "header": "T1",
          "desc": "D1",
          "image": "/uploads/1718816345679-think_0.png"
        }
      ]
    }
  }
  ```

### 4. Update Detail Item (with dynamic images)
- **Method**: `PUT`
- **URL**: `/:id`
- **Headers**: `Content-Type: multipart/form-data`
- **Request Body**:
  - `whatwedo_id` (Number, Optional)
  - `banner_title` (String, Optional)
  - `expertise_header` (String, Optional)
  - `expertise_desc` (String, Optional)
  - `think_items` (JSON String of Array, e.g. `[{"header": "T1 Updated", "desc": "D1", "image": "/uploads/old_img.png"}]`)
  - `banner_image` (File, Optional - Replaces existing banner image)
  - `think_image_0` (File, Optional - Replaces or adds image for think item at index 0)
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Detail record updated successfully",
    "data": {
      "id": "1",
      "whatwedo_id": 1,
      "banner_image": "/uploads/1718816345678-new_banner.png",
      "banner_title": "Updated Banner Title",
      "expertise_header": "Our Expertise",
      "expertise_desc": "Expertise Description",
      "think_items": [
        {
          "header": "T1 Updated",
          "desc": "D1",
          "image": "/uploads/1718816345680-new_think_0.png"
        }
      ]
    }
  }
  ```

### 5. Delete Detail Item
- **Method**: `DELETE`
- **URL**: `/:id`
- **Description**: Deletes the database records (main table and think items) and all associated physical images from disk.
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Detail record and associated images deleted successfully"
  }
  ```