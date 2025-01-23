import React, { useState } from "react";

const CaretakerCardReview = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleReviewSubmit = () => {
    if (selectedRating === 0 || reviewText.trim() === "") {
      alert("Por favor selecciona una puntuación y escribe tu reseña.");
      return;
    }

    const newReview = {
      rating: selectedRating,
      text: reviewText,
    };

    setReviews([...reviews, newReview]);
    setSelectedRating(0);
    setReviewText("");
  };

  return (
    <div id="c1" className="cardd">
      <div className="cardd-header">
        <img src="caretaker.jpg" alt="User Icon" />
      </div>
      <div className="cardd-body">
        <div className="text-center">
          <div className="starr-rating">
            {[5,4,3,2,1].map((star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  id={`star${star}-1`}
                  name="rating-1"
                  value={star}
                  checked={selectedRating === star}
                  onChange={() => handleRatingChange(star)}
                />
                <label htmlFor={`star${star}-1`}>&#9733;</label>
              </React.Fragment>
            ))}
          </div>
          <div className="ratingg-result">
            {selectedRating > 0
              ? `Puntuación seleccionada: ${selectedRating} estrella(s)`
              : "Selecciona una puntuación"}
          </div>
        </div>

        <div className="reviewss-container">
          <div className="ccort">
            <div className="totall-stars">
              &#9733;
              <span id="total-stars-1">
                {(
                  reviews.reduce((acc, review) => acc + review.rating, 0) /
                  (reviews.length || 1)
                ).toFixed(1)}
              </span>
            </div>
            <h2>
              Reseñas (<span id="review-count-1">{reviews.length}</span>)
            </h2>
          </div>
          <div id="reviews-listt-1">
            {reviews.length === 0
              ? "No hay reseñas aún."
              : reviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <strong>{`Puntuación: ${review.rating} estrellas`}</strong>
                    <p>{review.text}</p>
                  </div>
                ))}
          </div>
        </div>

        <textarea
          className="txtt"
          id="review-text-1"
          placeholder="Escribe tu reseña aquí..."
          rows="4"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        <button className="btton" id="submit-review-1" onClick={handleReviewSubmit}>
          Enviar Reseña
        </button>
      </div>
    </div>
  );
};

export default CaretakerCardReview;