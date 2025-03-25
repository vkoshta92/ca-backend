# HTTP Status Codes

## 200 OK
- **Meaning**: The request was successful.
- **When to Use**: For successful `GET`, `PUT`, or `PATCH` requests.

## 201 Created
- **Meaning**: A new resource has been created successfully.
- **When to Use**: Typically used for `POST` requests.

## 400 Bad Request
- **Meaning**: The server could not understand the request due to invalid syntax or input.
- **When to Use**: When a client sends incorrect or malformed data.

## 401 Unauthorized
- **Meaning**: Authentication is required but not provided or incorrect.
- **When to Use**: When a user needs to log in or provide valid credentials.

## 403 Forbidden
- **Meaning**: The server understands the request but refuses to authorize it.
- **When to Use**: When a user does not have permission to access the resource.

## 404 Not Found
- **Meaning**: The requested resource could not be found.
- **When to Use**: When a URL points to a non-existent page or resource.

## 500 Internal Server Error
- **Meaning**: A general error on the server-side occurred.
- **When to Use**: When an unexpected issue happens on the server.
