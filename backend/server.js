const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const books = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        image: "https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg"
    },
    {
        id: 2,
        title: "The Alchemist",
        author: "Paulo Coelho",
        image: "https://covers.openlibrary.org/b/isbn/9780061122415-M.jpg"
    },
    {
        id: 3,
        title: "Ikigai",
        author: "Hector Garcia",
        image: "https://covers.openlibrary.org/b/isbn/9780143130727-M.jpg"
    },
    {
        id: 4,
        title: "1984",
        author: "George Orwell",
        image: "https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg",
    },
    {
        id: 5,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        image: "https://covers.openlibrary.org/b/isbn/9780141439518-M.jpg",
    }
];
app.get("/", (req, res) => {
    res.send("Book Management API is running!");
});

app.get("/books", (req, res) => { res.json(books); }
);

app.get("/books/:id", (req, res) => {
    const bookId = Number(req.params.id);

    const book = books.find((b) => b.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }
    res.json(book);
});

app.post("/books", (req, res) => {
    const newBook = {
        id: Date.now(),
        title: req.body.title,
        author: req.body.author,
        image: req.body.image || ""
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});

app.put("/books/:id", (req, res) => {
    const bookId = Number(req.params.id);

    const book = books.find((b) => b.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.image = req.body.image || "";

    res.json({
        message: "Book updated successfully",
        book: book
    });
});

app.delete("/books/:id", (req, res) => {
    const bookId = Number(req.params.id);

    const bookIndex = books.findIndex((b) => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books.splice(bookIndex, 1);

    res.json({
        message: "Book deleted successfully"
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});