import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message || "Error listing books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading books...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="books-container">
        {books.map((book) => (
          <div
            className="book-card"
            key={book._id}
            onClick={() => navigate(`/book/${book._id}`)}
            style={{ cursor: "pointer" }}
          >
            <img className="book-cover" src={book.cover} alt={book.title} />
            <h3 className="book-title">
              {book.title} - ({book.year})
            </h3>
            <p className="book-author">Author: {book.author}</p>
            <p className="book-category">Category: {book.category}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
