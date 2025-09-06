import { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import "./index.css"; // Assuming this is your main CSS file for global styles and your custom styles

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query) return; // Prevents searching with an empty query
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      // Check if the response itself was OK (e.g., 200 status)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.docs.length === 0) {
        setError("No books found.");
        setBooks([]); // Clear books if no results
      } else {
        setBooks(data.docs.slice(0, 12)); // show first 12 results
      }
    } catch (err) {
      console.error("Fetch error: ", err); // Log the actual error for debugging
      setError("Something went wrong while fetching books."); // More user-friendly error
    } finally {
      setLoading(false); // Ensure loading is set to false even if an error occurs
    }
  };

  return (
    <div className="container"> {/* Assuming 'container' has some styling */}
      <h1 className="title">📚 Book Finder</h1> {/* Assuming 'title' has styling */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={searchBooks}
      />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {/* Only display BookList if there are books and no error/loading */}
      {!loading && !error && books.length > 0 && <BookList books={books} />}
      {/* Optional: Message for no results after search */}
      {!loading && !error && books.length === 0 && query && <p className="no-results">Search for a book to see results!</p>}
      {!loading && !error && books.length === 0 && !query && <p className="initial-message">Start by searching for a book!</p>}

    </div>
  );
}

export default App;