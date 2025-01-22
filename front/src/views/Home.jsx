
import CaretakerCard from "../components/ui/CaretakerCard";
import SearchBar from "../components/ui/SearchBar";
import CaretakerReviewCard from "../components/ui/CaretakerReviewCard";

export default function Home() {



  return (
    <>
      <main className="main">
        <SearchBar />

        <div className="positioncards">
          <CaretakerCard />
         
          
        </div>

        <div className="mapita">
          <h1 className="titulo">¿Necesitas un paseador?Descubre el lugar más cercano a tu hogar</h1>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26275.413736607054!2d-58.49360242568363!3d-34.5933697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb554d12b223d%3A0x94bc3b51e6e3a0ac!2sKALBBY!5e0!3m2!1ses!2sar!4v1737067365061!5m2!1ses!2sar"
            width="600" height="450"  style={{ border: 0 }}
            allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>



        <h1 className="titulo">¿Qué dicen nuestros clientes?</h1>

        <div className="positioncards">
          <div className="container mt-5 mt-55">
           <CaretakerReviewCard/>
           
          </div>
        </div>

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
