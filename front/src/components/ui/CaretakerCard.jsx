function CaretakerCard({ caretaker }) {


  return (
    <div className="card" style={{ width: "15rem", margin: "10px auto" }}>
       <img
          className="cardh"
          src={caretaker?.profilePicture}
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
        <h3 className="card-title text-center mt-3">{caretaker.name} {caretaker.lastName}</h3>
        <h5 className="card-title text-center mt-3">{caretaker.role}</h5>
        <p className="card-text text-center">
          {caretaker.about}
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
        <a  className="btn btn-primary botn d-block mx-auto">
          Contactar Servicio
        </a>
      </div>
    </div>
  );
}

export default CaretakerCard;