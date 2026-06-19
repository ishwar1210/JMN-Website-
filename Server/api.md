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
- **Description**: Returns all detail items from the `whatwedodetail` table ordered by creation date (newest first).
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
        "think_image": "/uploads/1718816345679-test_think.png",
        "think_header": "How We Think",
        "think_desc": "Think Description",
        "created_at": "2026-06-19T04:35:00.000Z"
      }
    ]
  }
  ```

### 2. Get Single Detail Item by ID
- **Method**: `GET`
- **URL**: `/:id`
- **Description**: Returns a single detail item matching the provided `id`.
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
      "think_image": "/uploads/1718816345679-test_think.png",
      "think_header": "How We Think",
      "think_desc": "Think Description",
      "created_at": "2026-06-19T04:35:00.000Z"
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

### 3. Create Detail Item (with images)
- **Method**: `POST`
- **URL**: `/`
- **Headers**: `Content-Type: multipart/form-data`
- **Request Body**:
  - `whatwedo_id` (Number, Required)
  - `banner_title` (String, Optional)
  - `expertise_header` (String, Optional)
  - `expertise_desc` (String, Optional)
  - `think_header` (String, Optional)
  - `think_desc` (String, Optional)
  - `banner_image` (File, Optional)
  - `think_image` (File, Optional)
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
      "think_image": "/uploads/1718816345679-test_think.png",
      "think_header": "How We Think",
      "think_desc": "Think Description"
    }
  }
  ```

### 4. Update Detail Item (with images)
- **Method**: `PUT`
- **URL**: `/:id`
- **Headers**: `Content-Type: multipart/form-data`
- **Request Body**:
  - `whatwedo_id` (Number, Optional)
  - `banner_title` (String, Optional)
  - `expertise_header` (String, Optional)
  - `expertise_desc` (String, Optional)
  - `think_header` (String, Optional)
  - `think_desc` (String, Optional)
  - `banner_image` (File, Optional - Replaces existing banner image)
  - `think_image` (File, Optional - Replaces existing think image)
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
      "think_image": "/uploads/1718816345679-test_think.png",
      "think_header": "How We Think",
      "think_desc": "Think Description"
    }
  }
  ```

### 5. Delete Detail Item
- **Method**: `DELETE`
- **URL**: `/:id`
- **Description**: Deletes the database record and associated physical images from the storage.
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Detail record and associated images deleted successfully"
  }
  ```