

import SearchBar from "../components/ui/SearchBar";
import CaretakerReviewCard from "../components/ui/CaretakerCardReview";
import Caretakers from "../components/ui/Caretakers";
import CaretakerCardReview from "../components/ui/CaretakerCardReview";
export default function Home() {


  return (
    <>
      <main className="main">
      <h1>Encontrá el cuidador ideal para tu mascota</h1>
        <SearchBar />

        <Caretakers />
       



        <h1 className="titulo">¿Qué dicen nuestros clientes?</h1>
{/* 
        <div className="positioncards">
          <div className="container mt-5 mt-55">
             <CaretakerCardReview />

          </div>
        </div> */}

        <h1 className="titulo">¿Qué dicen las mascotas?</h1>
        <div className="ftmascotas">
          <div>
            <img className="cardh" src="pets.jpg" alt="" />
          </div>
          <div>
            <img className="cardh" src="pets.jpg" alt="" />
          </div>
          <div>
            <img className="cardh" src="pets.jpg" alt="" />
          </div>
        </div>
      </main>
    </>
  );
}
