# BookShelf – Book Management System

BookShelf is a simple book management web application developed using React and Express.js. It allows users to manage a collection of books through a clean interface.

## Features

- View all available books.
- Add new books with title, author and cover image URL.
- Edit existing book details.
- Delete books with confirmation.
- Search books by title or author.
- Display book cover images.

## Technologies Used

- **Frontend:** React, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **API Communication:** REST API, Fetch API
- **Other:** CORS, JSON

## Project Structure

```text
BookShelf/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## How to Run the Project

**1. Start the backend:**

```bash
cd backend
npm install
node server.js
```

The backend runs at `http://localhost:5000`.

**2. Start the frontend in another terminal:**

```bash
cd frontend
npm install
npm run dev
```

Open the local URL provided by Vite in your browser.

## REST API Endpoints

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/books` | Retrieve all books |
| GET | `/books/:id` | Retrieve a book by ID |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

## Note

The application currently uses an in-memory array to store book records. Data resets to the initial records whenever the backend server restarts.
