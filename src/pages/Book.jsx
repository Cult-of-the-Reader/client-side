import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/Global/LoadingSpinner.jsx';
import ErrorMessage from '../components/Global/ErrorMessage.jsx';
import BookContent from '../components/Product/BookContent.jsx';

const Book = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [errorReviews, setErrorReviews] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookResponse = await api.getBookById(id);
                const bookData = await bookResponse.json();
                setBook(bookData);

                const reviewsResponse = await api.getReviewsBooks(id);
                const reviewsData = await reviewsResponse.json();
                setReviews(reviewsData);
            } catch (err) {
                setError('Error al cargar el libro');
                console.error(err)
            } finally {
                setLoading(false);
                setLoadingReviews(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmitReview = async (rating, comment, token) => {
        try {
            const response = await api.postReviews(id, rating, comment, token);
            if (response.ok) {
                const newReview = await response.json();
                setReviews((prevReviews) => [newReview, ...prevReviews]);
                return true;
            } else {
                throw new Error('Error al enviar la reseña');
            }
        } catch (err) {
            setErrorReviews(err.message);
            return false;
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!book) return <ErrorMessage message="Libro no encontrado" />;

    return (
        <BookContent
            book={book}
            reviews={reviews}
            loadingReviews={loadingReviews}
            errorReviews={errorReviews}
            onSubmitReview={handleSubmitReview}
        />
    )
};

export default Book; 