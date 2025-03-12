import { useState, useEffect } from "react";
import Hero from '../components/Home/Hero.jsx';
import BookList from '../components/Home/BookList.jsx';
import LoadingSpinner from '../components/Global/LoadingSpinner.jsx';
import ErrorMessage from '../components/Global/ErrorMessage.jsx';
import api from "../services/api.js";

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
        setError("Error al cargar los libros");
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <main>
      <Hero />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <BookList books={books} />
      )}
    </main>
  );
};

export default Home; 