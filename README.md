
A simple Blog Platform Backend built using Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, and bcrypt.

**Live Demo:** [https://node-j-mongo-db-evaluation.vercel.app/](https://node-j-mongo-db-evaluation.vercel.app/)

## Features

- User Registration
- User Login
- JWT Authentication
- Create Post
- Get All Posts
- Get Single Post
- Update Own Post
- Delete Own Post
- Pagination
- Tag Filtering
- Request Logging Middleware
- Global Error Handling
- Rate Limiting

## Installation

Clone the repository:

```bash
git clone https://github.com/Summi51/NodeJ-MongoDB-Evaluation.git
```

Install dependencies:

```bash
npm install
```

Create a .env file:

```env
PORT=8000

MONGO_URI=mongodb://127.0.0.1:27017/blogdb

JWT_SECRET=mysecretkey
```

Run the server:

```bash
npm run dev
```

Server will start at:

```http
http://localhost:8000
```

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Posts

POST /api/posts

GET /api/posts

GET /api/posts/:id

PUT /api/posts/:id

DELETE /api/posts/:id

## Author

Samreen Inayat