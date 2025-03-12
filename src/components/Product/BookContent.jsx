import React, { useState } from 'react';
import './BookContent.css';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../contexts/CartContext.jsx';

const BookContent = ({ book, reviews, loadingReviews, errorReviews, onSubmitReview }) => {
  const discountedPrice = book.price * (1 - book.discount);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitError, setSubmitError] = useState(null);
  const { addToCart } = useCartContext()
  const { user } = useAuth();
  const token = user?.token

  const handleAddToCart = () => {
    if (!token) {
      setSubmitError('You must be logged in to add items to cart');
      return;
    }
    addToCart(book);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!token) {
      setSubmitError('Debes iniciar sesión para publicar una reseña');
      return;
    }

    try {
      const success = await onSubmitReview(rating, comment, token);
      if (success) {
        setComment('');
        setSubmitError(null);
      }
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <div className="book-detail">
      <div className="book-detail-grid">
        <div className="book-image-section">
          <img src={book.cover} alt={book.title} className="book-cover" />
          {book.signedCopy && (
            <span className="signed-badge">Signed Copy</span>
          )}
        </div>

        <div className="book-info-section">
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>

          <div className="book-meta">
            <span className="year">{book.year}</span>
            <span className="category">{book.category}</span>
            {book.isBestseller && (
              <span className="bestseller-badge">Bestseller</span>
            )}
          </div>

          <div className="book-price">
            {book.discount > 0 ? (
              <>
                <span className="original-price">${book.price}</span>
                <span className="discounted-price">${discountedPrice.toFixed(2)}</span>
                <span className="discount-badge">-{(book.discount * 100)}%</span>
              </>
            ) : (
              <span className="price">${book.price}</span>
            )}
          </div>

          <div className="stock-status">
            {book.stock > 0 ? (
              <span className="in-stock">({book.stock} in stock)</span>
            ) : (
              <span className="out-of-stock">Out of stock</span>
            )}
          </div>
          <button
            className={`add-to-cart-btn ${book.stock === 0 ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={book.stock === 0}
          >
            {book.stock > 0 ? 'Add to cart' : 'Out of stock'}
          </button>
          <h3>Information</h3>
          <p className="description">{book.description}</p>
          <div className="book-details">

            <div className="details-grid">
              <div className="detail-item">
                <span>ISBN:</span>
                <span>{book.isbn}</span>
              </div>
              <div className="detail-item">
                <span>Publisher:</span>
                <span>{book.publisher}</span>
              </div>
              <div className="detail-item">
                <span>Pages:</span>
                <span>{book.pageCount}</span>
              </div>
              <div className="detail-item">
                <span>Language:</span>
                <span>{book.language}</span>
              </div>
              <div className="detail-item">
                <span>Format:</span>
                <span>{book.format}</span>
              </div>
              <div className="detail-item">
                <span>Edition:</span>
                <span>{book.edition}</span>
              </div>
            </div>
          </div>

          {book.tags && book.tags.length > 0 && (
            <div className="tags">
              {book.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="reviews-section">
        <div className="review-grid">
          {token ? (
            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="form-group">
                <label>Rating:</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  {[5, 4, 3, 2, 1].map(num => (
                    <option key={num} value={num}>{num} Stars</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review..."
                  required
                />
              </div>
              <button type="submit" className="submit-review-btn">
                Send Review
              </button>
              {submitError && <div className="error-message">{submitError}</div>}
            </form>
          ) : (
            <div className="login-prompt-box">
              <Link to="/login" className="login-prompt-link">
                <p>Login to leave a review</p>
              </Link>
            </div>
          )}

          <div className="reviews-list-container">
            {loadingReviews ? (
              <div className="loading-reviews">Loading reviews...</div>
            ) : errorReviews ? (
              <div className="error-reviews">{errorReviews}</div>
            ) : (
              <>
                {reviews.length === 0 ? (
                  <div className="no-reviews">
                    No reviews yet. Be the first one!
                  </div>
                ) : (
                  reviews
                    .slice()
                    .reverse()
                    .map(review => (
                      <div key={review._id} className="review-card">
                        <div className="review-header">
                          <span className="review-rating">
                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                          </span>
                          {review.createdAt && (
                            <span className="review-date">
                              {new Date(review.createdAt).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                              })}
                            </span>
                          )}
                        </div>
                        <p className="review-comment">{review.comment}</p>
                        <p className="review-user">
                          By: {review.username}
                        </p>
                      </div>
                    ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookContent;