# ezeeRider Backend API Documentation

## Authentication Endpoints

### 1. Register User

- **Endpoint:** `POST /api/users/register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Example Success Response:**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "_id": "60f7c2b8e1b1c8a1b8e1b1c8",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```
- **Responses:**
  - `201 Created` - User registered successfully.
  - `400 Bad Request` - Missing or invalid fields.
  - `409 Conflict` - Email already exists.

---

### 2. Login User

- **Endpoint:** `POST /api/users/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Example Success Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "60f7c2b8e1b1c8a1b8e1b1c8",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```
- **Responses:**
  - `200 OK` - Login successful, returns token and user.
  - `400 Bad Request` - Missing or invalid fields.
  - `401 Unauthorized` - Invalid credentials.

---

### 3. Get User Profile

- **Endpoint:** `GET /api/users/profile`
- **Description:** Retrieves the authenticated user's profile.
- **Headers:**
  - `Authorization: Bearer <token>` or Cookie `token`
- **Example Success Response:**
  ```json
  {
    "user": {
      "_id": "60f7c2b8e1b1c8a1b8e1b1c8",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2023-01-01T12:00:00.000Z"
    }
  }
  ```
- **Responses:**
  - `200 OK` - Returns user profile.
  - `401 Unauthorized` - Invalid or missing token.

---

### 4. Logout User

- **Endpoint:** `GET /api/users/logout`
- **Description:** Logs out the user by blacklisting the JWT token and clearing the cookie.
- **Headers:**
  - `Authorization: Bearer <token>` or Cookie `token`
- **Example Success Response:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
- **Responses:**
  - `200 OK` - Logout successful.
  - `401 Unauthorized` - Invalid or missing token.

---

## JWT Blacklisting and Token Clearing

### Theory

JWTs (JSON Web Tokens) are stateless and, by default, cannot be invalidated before their expiry. To allow users to log out and immediately invalidate their tokens, a **token blacklist** is implemented. When a user logs out, their JWT is stored in a blacklist collection in the database with a TTL (time-to-live) of 24 hours. Any subsequent request with a blacklisted token is denied, even if the token is otherwise valid.

### Implementation

- On logout, the backend:
  - Adds the JWT token to the `BlacklistToken` collection with a 24-hour expiry.
  - Clears the `token` cookie from the client.
- On each authenticated request, the backend:
  - Checks if the token is present in the blacklist.
  - If blacklisted, denies access with a `401 Unauthorized` response.

This ensures that tokens are effectively invalidated on logout, improving security for the application.

---

## Data Format

- All endpoints accept and return data in JSON format.
- For protected routes, include the JWT token in the `Authorization` header.

---

## Status Codes

- `200 OK` - Request succeeded.
- `201 Created` - Resource created.
- `400 Bad Request` - Invalid input.
- `401 Unauthorized` - Authentication failed.
- `409 Conflict` - Resource conflict (e.g., duplicate email).

---

> **Note:** Replace endpoint paths and request/response details as per your actual implementation.
