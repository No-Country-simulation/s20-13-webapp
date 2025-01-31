import { Link } from "react-router";
import { useUser } from "../../hooks/useUser";
import {  dictionaryService } from "../../utils/helpers";

function CaretakerCard({ caretaker }) {
  const {user}=useUser()
  
  const linkTo=user ? `/caretaker/${caretaker._id}` : "/auth"

  return (
    <div className="card" style={{ width: "18rem", margin: "15px" }}>
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
        <h3 className="card-title ">{caretaker.name} {caretaker.lastName}</h3>
        <h2 className="card-title ">{dictionaryService[caretaker.service]}</h2>
        
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
          {/* ${
           caretaker.cost
          } por hora */}
       $6000
        </h1>
        <Link to={linkTo} className="btn btn-primary botn d-block mx-auto">
         { user ? "Contactar Servicio" : "Inicia Sesion para contactar"}
        </Link>
      </div>
    </div>
  );
}

export default CaretakerCard;