import React, { useState } from 'react';
import './App.css';

const booksData = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    reviews: [
      { user: 'Alice', text: 'A classic!' },
      { user: 'Bob', text: 'Loved the characters.' },
    ],
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    reviews: [
      { user: 'Eve', text: 'Thought-provoking and chilling.' },
    ],
  },
];

export default function App() {
  const [books, setBooks] = useState(booksData);
  const [selectedBook, setSelectedBook] = useState(null);
  const [reviewText, setReviewText] = useState('');

  const handleAddReview = () => {
    if (!reviewText.trim()) return;
    const updatedBooks = books.map((book) => {
      if (book.id === selectedBook.id) {
        return {
          ...book,
          reviews: [...book.reviews, { user: 'You', text: reviewText.trim() }],
        };
      }
      return book;
    });
    setBooks(updatedBooks);
    setReviewText('');
  };

  return (
    <div className="container">
      <h1>📚 Book Review Platform</h1>

      {!selectedBook ? (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book.id} onClick={() => setSelectedBook(book)}>
              <strong>{book.title}</strong> by {book.author}
            </li>
          ))}
        </ul>
      ) : (
        <div className="book-detail">
          <button onClick={() => setSelectedBook(null)}>&larr; Back</button>
          <h2>{selectedBook.title}</h2>
          <p>by {selectedBook.author}</p>

          <h3>Reviews</h3>
          <ul className="review-list">
            {selectedBook.reviews.map((review, index) => (
              <li key={index}>
                <strong>{review.user}:</strong> {review.text}
              </li>
            ))}
          </ul>

          <textarea
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <br />
          <button onClick={handleAddReview}>Submit Review</button>
        </div>
      )}
    </div>
  );
}
