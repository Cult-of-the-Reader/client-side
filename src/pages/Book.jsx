import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useCart from "../hook/useCart.jsx";
import Cart from "../components/Cart.jsx";
import api from "../services/api";

const BookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { cart, addToCart, updateQuantity, removeFromCart, total, refresh } = useCart();
  const [showCart, setShowCart] = useState(false);


  const handleAddToCart = (e, book) => {
    e.stopPropagation();
    addToCart(book);
  };

  const handleCartToggle = () => {
    if (!showCart) {
      refresh();
    }
    setShowCart(!showCart);
  };

  const isAuthenticated = !!user;

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const bookResponse = await api.getBookById(id)

        if (!bookResponse.ok) throw new Error("Book not found");

        const bookData = await bookResponse.json();
        setBook(bookData);

        const reviewsResponse = await api.getReviewsBooks(id)

        if (!reviewsResponse.ok) throw new Error("Error loading reviews");

        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id, submitSuccess]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return navigate("/login");

    try {
      const response = await api.postReviews(id, rating, comment)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error submitting review");
      }

      setSubmitSuccess(true);
      setComment("");
      setRating(5);
      setSubmitError("");

      const reviewsResponse = await api.getReviewsBooks(id);
      const reviewsData = await reviewsResponse.json();
      setReviews(reviewsData);
    } catch (err) {
      setSubmitError(err.message);
      setTimeout(() => setSubmitError(""), 5000);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div>
      <button
        className="cart-toggle-btn"
        onClick={handleCartToggle}
      >
        Cart ({cart.length})
      </button>
      <div>
        <img src={book.cover} alt={book.title} />
        <div>
          <h1>{book.title}</h1>
          <p>By {book.author}</p>
          <p>
            Published in {book.year} - {book.publisher} - {book.pageCount} pages
          </p>
          <p>{book.description}</p>
          <div>
            <span>Category:</span> {book.category}
          </div>
          <div>
            {book.discount > 0 ? (
              <>
                <span>After: ${book.price.toFixed(2)}</span>
                <br />
                <span>Now: ${(book.price * (1 - book.discount)).toFixed(2)}</span>
                <span> ({Math.round(book.discount * 100)}% OFF)</span>
              </>
            ) : (
              <span>${book.price.toFixed(2)}</span>
            )}
          </div>
          <div>
            {book.stock > 0 ? (
              <span>In Stock ({book.stock} available)</span>
            ) : (
              <span>Out of Stock</span>
            )}
          </div>
          <div>
            {book.isBestseller && <span>Bestseller</span>}
            {book.signedCopy && <span>Signed Copy</span>}
          </div>
          <div>
            <button disabled={book.stock === 0} onClick={(e) => handleAddToCart(e, book)}>Add to Cart</button>
          </div>
        </div>
      </div>

      <h2>Reviews ({reviews.length})</h2>
      {isAuthenticated ? (
        <form onSubmit={handleSubmitReview}>
          <h3>Add Your Review</h3>
          {submitError && <div style={{ color: "red" }}>{submitError}</div>}

          <div>
            <label>Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num} stars
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              minLength="10"
            />
          </div>

          <button type="submit">Submit Review</button>
        </form>
      ) : (
        <p>
          <button onClick={() => navigate("/login")}>
            Log in to leave a review
          </button>
        </p>
      )}

      <div>
        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews
            .slice()
            .reverse()
            .map((review) => (
              <div key={review._id}>
                <p>Rating: {review.rating}/5</p>
                <p>{review.comment}</p>
                <p>By: {review.userId || "Anonymous"}</p>
                {review.createdAt && (
                  <p>Date: {new Date(review.createdAt).toLocaleDateString()}</p>
                )}
              </div>
            ))
        )}
      </div>
        <Cart
          items={cart}
          total={total}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onClose={() => setShowCart(false)}
        />
    </div>
  );
};

export default BookPage;
