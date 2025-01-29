import {  useParams } from "react-router";
import CaretakerCardReview from "../components/ui/CaretakerCardReview";

function CaretakerProfile() {

const params=useParams()
  const id=params.id


  return (
    <div>
      <h1>Profile</h1>
       <CaretakerCardReview id={id}  />
    </div>
  );
}

export default CaretakerProfile;