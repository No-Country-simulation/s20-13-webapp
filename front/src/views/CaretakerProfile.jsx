import {  useParams } from "react-router";

function CaretakerProfile() {

    const params=useParams()
    console.log(params)


  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

export default CaretakerProfile;