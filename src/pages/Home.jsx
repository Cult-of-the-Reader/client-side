import { useState, useEffect } from "react";
import BooksList from "../components/BooksList.jsx";
import api from "../services/api";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <BooksList books={books} />
  );
};

export default Home;
