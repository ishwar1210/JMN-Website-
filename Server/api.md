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
  ```json
  {
    "success": true,
    "message": "Item deleted successfully"
  }
  ```