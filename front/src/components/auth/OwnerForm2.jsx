import { useState } from "react"
import { neighborhoods } from "../../data/neighborhood"
import ErrorMessage from "../ui/ErrorMessage"
import api from "../../lib/axios"
import { isAxiosError } from "axios"
import { useParams } from "react-router"



export default function OwnerForm2({ prevForm, nextForm }) {

  const params = useParams()
  const id = params.id
  const [data, setData] = useState({
    about: "",
    nationality: "",
    neighborhood: "",
    phone: ""
  })
  const [errors, setErrors] = useState({
    about: "",
    nationality: "",
    neighborhood: "",
    phone: ""
  })

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;

    if (name === "phone" && !/^\d*$/.test(value)) {
      return
    }
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: "" });

  }

  const handleSubmit = async(e) => {
    e.preventDefault()
  
    const newErrors = {}
    if (data.about === "") newErrors.about="La descripción es obligatoria" 
    if (data.nationality === "") newErrors.nationality="La nacionalidad es obligatoria" 
    if (data.neighborhood === "") newErrors.neighborhood="El barrio es obligatorio" 
    if (data.phone === "" || data.phone.length <= 8) newErrors.phone="El teléfono es obligatorio" 
          
      if(Object.keys(newErrors).length >0){
        setErrors({...errors,...newErrors})
        return
      }

      try {
        const request = await api.put(`/users/${id}`,data)
        console.log(request)
        nextForm()
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          console.log(error.response.data.error)
        }
      }


  }
  return (
    <main className="formuaaa">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h2>INFORMACIÓN ADICIONAL</h2>

          <label htmlFor="nationality">Nacionalidad:</label>
          <input
            onChange={handleChange}
            type="text"
            id="nationality"
            name="nationality"
            placeholder="Escribe tu nacionalidad"
            value={data.nationality}


          />
            {errors.nationality && <ErrorMessage>{errors.nationality}</ErrorMessage>}
          <label htmlFor="neighborhood">Barrio:</label>
          <select
            onChange={handleChange}
            value={data.neighborhood}
            name="neighborhood"
            id="neighborhood"
          >
            <option value={""}>--Selecciona tu barrio--</option>
            {
              neighborhoods.map(item => (
                <option
                  value={item.name}
                  key={item.id}>{item.name}</option>
              ))
            }
          </select>
          {errors.neighborhood && <ErrorMessage>{errors.neighborhood}</ErrorMessage>}
          <label htmlFor="phone">Teléfono:</label>
          <input
            onChange={handleChange}
            type="number"
            id="phone"
            name="phone"
            placeholder="Escribe tu número de teléfono"


          />
          {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}

          <label htmlFor="about">Breve descripción sobre vos:</label>
          <textarea
            onChange={handleChange}
            className="sss"
            id="about"
            name="about"
            rows="4"
            placeholder="Escribe una breve descripción sobre ti"
     
          ></textarea>
          {errors.about && <ErrorMessage>{errors.about}</ErrorMessage>}
          <input
            className="btn-input"
            type="submit"
            value={"Guardar y continuar"}
          />
          
        </form>
      </div>
    </main>
  )
}
