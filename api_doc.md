
## Endpoints :

List of available endpoints:


- `POST /register`
- `POST /login`
- `GET /courses`
- `GET /courses/:id`
- `POST /courses`
- `PUT /courses/:id`
- `DELETE /courses/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "id": 1,
    "email": "email@mail.com",
    "password": "$2b$05$dh8AZLW/9dcsMTLR8r7ZpOeMcL8Xc1ZRFzxvmjxdONYP.1aB1dKwC",
    "role": "Instructor",
    "updatedAt": "2021-10-26T20:30:01.482Z",
    "createdAt": "2021-10-26T20:30:01.482Z",
    "username": null,
    "phoneNumber": null,
    "address": null
}
```

_Response (400 - Bad Request)_

```json
[
    "Email are required",
    "Please enter a valid email address",
    "Password are required"
]
OR
[
    "email must be unique"
]
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Login successful",
  "access_token": "string",
  "user_id": 1,
  "user_role": "Instructor"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /courses

Description:

- Get all courses from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "title": "Courses Title",
        "content": "courses Content",
        "imgUrl": "https://ik.imagekit.io/rh7vnzng7r8/debuggingmem_MTYXlfFGMgs.jpeg",
        "categoryId": 1,
        "authorId": 1,
        "status": "Active",
        "createdAt": "2021-10-26T19:03:54.984Z",
        "updatedAt": "2021-10-26T19:03:54.984Z",
        "Category": null
    },
    {
        "id": 2,
        "title": "Courses Title",
        "content": "courses Content",
        "imgUrl": "https://ik.imagekit.io/rh7vnzng7r8/debuggingmem_aHEZcfVRp.jpeg",
        "categoryId": 2,
        "authorId": 2,
        "status": "Active",
        "createdAt": "2021-10-26T19:07:49.372Z",
        "updatedAt": "2021-10-26T19:07:49.372Z",
        "Category": null
    }
  ...
]
```
&nbsp;

## 4. POST /courses

Description:

- Create courses by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
    "title": "Courses Title (required)",
    "content": "courses content (required)",
    "imgUrl": "https://ik.imagekit.io/rh7vnzng7r8/debuggingmem_aHEZcfVRp.jpeg",
    "categoryId": 1,
}
```

_Response (201 - Created)_

```json
{
    "id": 1,
    "title": "Courses Title",
    "content": "courses content",
    "imgUrl": "https://ik.imagekit.io/rh7vnzng7r8/debuggingmem_aHEZcfVRp.jpeg",
    "categoryId": 1,
    "authorId": 1,
    "status": "Active",
    "createdAt": "2021-10-26T19:07:49.372Z",
    "updatedAt": "2021-10-26T20:17:22.427Z"
}
```


&nbsp;

## 5. PUT /courses/:id

Description:

- Update courses by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "title": "Courses Title",
    "content": "courses content",
    "imgUrl": "https://ik.imagekit.io/rh7vnzng7r8/debuggingmem_aHEZcfVRp.jpeg",
    "categoryId": 1,
    "authorId": 1,
    "status": "Active",
    "createdAt": "2021-10-26T19:07:49.372Z",
    "updatedAt": "2021-10-26T20:17:22.427Z"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden: Not Authorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Courses with id {id} not found"
}
```

&nbsp;

## 6. PATCH /courses/:id

Description:

- Update courses status by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "title": "Courses Title",
    "content": "courses content",
    "imgUrl": "https://ik.imagekit.io/rh7vnzng7r8/debuggingmem_aHEZcfVRp.jpeg",
    "categoryId": 1,
    "authorId": 1,
    "status": "Active",
    "createdAt": "2021-10-26T19:07:49.372Z",
    "updatedAt": "2021-10-26T20:17:22.427Z"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden: Not Authorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Courses with id {id} not found"
}
```

&nbsp;

## 7. POST /google-signin

Request:

- body:

```json
{
  "id_token": "string",
}
```

_Response (200 - OK)_

```json
{
  "message": "Login successful",
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Login successful",
  "access_token": "string",
  "user_id": 1,
  "user_role": "Instructor"
}
```


&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Not Authorized"
}
OR
{
  "message": "Invalid Email or Password"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
