import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Schedule from "../components/ui/Schedule";
import { dictionaryService } from "../utils/helpers";
import ContactCard from "../components/ui/ContactCard";
import { isAxiosError } from "axios";
import api from "../lib/axios"; 

function CaretakerProfile() {
  const { id } = useParams();
  const [caretaker, setCaretaker] = useState(null);

  useEffect(() => {
    const fetchCaretaker = async () => {
      try {
        const { data } = await api(`/caretaker/${id}`);
        setCaretaker(data.data);
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          console.log(error.response.data.message);
        }
      }
    };
    fetchCaretaker();
  }, [id]);

  if (!caretaker) return <p>Cargando...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-h1">Perfil del cuidador</h1>
        <img
          className="picture-profile"
          src={caretaker.profilePicture}
          alt="Imagen de cuidador"
        />
        <h2>
          {caretaker.name} {caretaker.lastName}
        </h2>
        
          <p className="p-service">{dictionaryService[caretaker.service]}</p>
          <p>{caretaker.about}</p>
          <p>Tarifa por hora: ${caretaker.cost}</p>
          <p>
            {caretaker.zone}, {caretaker.neighborhood}
          </p>
      
        <Schedule availability={caretaker.availability} />
      </div>
      <ContactCard caretaker={caretaker} />
    </div>
  );
}

export default CaretakerProfile;