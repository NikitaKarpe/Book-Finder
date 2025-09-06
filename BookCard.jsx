import React from "react";

function BookCard({ book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <div className="book-card">
      {coverUrl ? (
        <img src={coverUrl} alt={book.title} />
      ) : (
        <div className="no-image">No Image</div>
      )}
      <h2>{book.title}</h2>
      <p className="author">
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>
      <p className="year">{book.first_publish_year || "N/A"}</p>
    </div>
  );
}

export default BookCard;