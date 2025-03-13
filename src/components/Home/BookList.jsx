import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

import './BookList.css';

const BookList = ({ books }) => {
    const navigate = useNavigate();
    const { addToCart } = useCartContext();
    const { user } = useAuth();
    const token = user?.token;

    const handleAddToCart = (e, book) => {
        e.stopPropagation();
        if (!token) {
            navigate('/login');
            return;
        }
        addToCart(book);
    };

    return (
        <section className="catalog">
            <h2>Catalog</h2>
            <div className="books-grid">
                {books.map((book) => (
                    <article
                        className="book-card"
                        key={book._id}
                        onClick={() => navigate(`/book/${book._id}`)}
                    >
                        <div className="book-cover-wrapper">
                            <img src={book.cover} alt={book.title} />
                            <button
                                className="add-to-cart-btn"
                                onClick={(e) => handleAddToCart(e, book)}
                            >
                                Add to Cart
                            </button>
                        </div>
                        <div className="book-info">
                            <h3>{book.title}</h3>
                            <p className="book-year">{book.year}</p>
                            <p className="book-author">{book.author}</p>
                            <span className="book-category">{book.category}</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default BookList; 