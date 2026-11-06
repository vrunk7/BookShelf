import { useState } from "react";

function BookForm({ book, onSubmit, onCancel }) {
    const [title, setTitle] = useState(book ? book.title : "");
    const [author, setAuthor] = useState(book ? book.author : "");
    const [image, setImage] = useState(book ? book.image || "" : "");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !author.trim()) {
            alert("Please enter the book title and author.");
            return;
        }

        onSubmit({
            title: title.trim(),
            author: author.trim(),
            image: image.trim()
        });
    };

    return (
        <div className="form-overlay">
            <div className="book-form">

                <h2>{book ? "Edit Book" : "Add New Book"}</h2>

                <form onSubmit={handleSubmit}>

                    <label>Book Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter book title"
                    />

                    <label>Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Enter author name"
                    />

                    <label>Book Cover Image URL (Optional)</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Paste image URL"
                    />

                    <div className="form-actions">
                        <button type="button" onClick={onCancel}>
                            Cancel
                        </button>

                        <button type="submit" className="save-btn">
                            {book ? "Update Book" : "Add Book"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default BookForm;