import { useState, useEffect } from "react";
import Header from "./components/Header";
import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.log("Error fetching books:", error);
      });
  }, []);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()),
  );

  // Open form for adding a book
  const handleAddClick = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  // Open form for editing a book
  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleFormSubmit = async (bookData) => {
    try {
      if (editingBook) {
        // Update existing book
        const response = await fetch(`${API_URL}/books/${editingBook.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        });

        if (!response.ok) {
          throw new Error("Failed to update book");
        }

        const data = await response.json();

        setBooks(
          books.map((book) => (book.id === editingBook.id ? data.book : book)),
        );
      } else {
        // Add new book
        const response = await fetch(`${API_URL}/books`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        });

        if (!response.ok) {
          throw new Error("Failed to add book");
        }

        const data = await response.json();

        setBooks([...books, data.book]);
      }

      setShowForm(false);
      setEditingBook(null);
    } catch (error) {
      console.log("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/books/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      await response.json();

      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.log("Error:", error);
      alert("Unable to delete book. Please try again.");
    }
  };

  return (
    <div>
      <Header />

      <main className="container">
        <section className="welcome-section">
          <h1>Manage Your Library</h1>
          <p>Organize, track and manage your personal book collection.</p>
        </section>

        <section className="library-section">
          <div className="section-heading">
            <div>
              <h2>My Books</h2>
              <p>{books.length} books in your library</p>
            </div>
            <button className="add-btn" onClick={handleAddClick}>
              + Add New Book
            </button>{" "}
          </div>

          <input
            type="text"
            className="search-input"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="book-grid">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p className="empty-message">No books found.</p>
            )}
          </div>
        </section>
      </main>
      {showForm && (
        <BookForm
          book={editingBook}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;
