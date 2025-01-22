function CaretakerCard() {
    return (
      <div className="card" style={{ width: "18rem", margin: "10px auto" }}>
        <img
          className="cardh"
          src="caretaker.jpg"
          alt="Imagen de paseador"

        />
        <div className="card-body">
          <div className="summary-container ppp text-center mt-3">
            <p className="colorest">
              &#9733;<span id="total-stars-summary-1">0</span>
            </p>
            <a className="stilet" href="#">
              <p>
                (Reseñas <span id="review-count-summary-1">0</span>)
              </p>
            </a>
          </div>
          <h5 className="card-title text-center mt-3">Paseador</h5>
          <p className="card-text text-center">
            Me encargo de pasear tu mascota durante 1 hora.
          </p>
          <h1
            style={{
              fontSize: "20px",
              color: "blue",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            $6.000
          </h1>
          <a href="#c1" className="btn btn-primary botn d-block mx-auto">
            PUNTUA TU SERVICIO
          </a>
        </div>
      </div>
    );
  }
  
  export default CaretakerCard;