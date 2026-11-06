import { useState } from "react";

function BookCard({ book, onEdit, onDelete }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="book-card">
      <div className="book-cover">
        {book.image && !imageError ? (
          <img
            src={book.image}
            alt={book.title}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="cover-placeholder">
            <span>▤</span>
            <p>BookShelf</p>
          </div>
        )}
      </div>

      <div className="book-info">
        <span className="book-id">ID #{book.id}</span>

        <h3>{book.title}</h3>

        <p className="author">By {book.author}</p>
      </div>

      <div className="book-actions">
        <button className="edit-btn" onClick={() => onEdit(book)}>
          Edit
        </button>

        <button className="delete-btn" onClick={() => onDelete(book.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookCard;
