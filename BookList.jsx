import React from "react";
import BookCard from "./BookCard";

function BookList({ books }) {
  return (
    <div className="book-list">
      {books.map((book, i) => (
        <BookCard key={i} book={book} />
      ))}
    </div>
  );
}

export default BookList;