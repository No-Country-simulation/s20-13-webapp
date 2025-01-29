import { useMemo, useState } from "react"

export default function OwnerForm3() {
    const [preview,setPreview]=useState()

    
     const memoPicture = useMemo(() => preview, [preview])
    
    
      const handleInputFile = (e) => {
    
        e.preventDefault()
        const file = e.target.files[0]
        if (file) {
          setPreview(URL.createObjectURL(file))
          handleFormData(file)
        }
    
      }
    
  const handleFormData = async (file) => {
    // if (!file) return setErrors({ ...errors, preview: "Error al seleccionar la imagen" })
    // const formdata = new FormData()
    // formdata.append("image", file)

    // try {
    //   const request = await api.post("/users/image", formdata)
    //   console.log(request)
    // } catch (error) {
    //   if (isAxiosError(error) && error.response) {
    //     setErrors({ ...errors, preview: error.response.data.error });
    //   }
    // }

  }

  return (
    <main className="formuaaa">
        <div className="form-container">

       
      <form className="form">
        <h2>Información sobre Mascotas</h2>
        
        <div className="profile-picture-container">
        {
              memoPicture ?
                <img className='picture-img' src={memoPicture} height="150px" width="150px" alt="Foto mascota" />
                :
                <svg  width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" rx="4" fill="#e0e0e0"/>
  <path d="M7 10.5C7 9.67157 7.67157 9 8.5 9C9.32843 9 10 9.67157 10 10.5C10 11.3284 9.32843 12 8.5 12C7.67157 12 7 11.3284 7 10.5Z" fill="#9e9e9e"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M4 6C4 5.44772 4.44772 5 5 5H8L9 4H15L16 5H19C19.5523 5 20 5.44772 20 6V18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18V6ZM6 8V17H18V8H6ZM8 16H16L12 11L8 16Z" fill="#9e9e9e"/>
</svg>
            }

            <label htmlFor="profile-picture-input" className="camera-icon">
              📷
            </label>
            <input
              type="file"
              id="profile-picture-input"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleInputFile}


            />
          <input onChange={handleInputFile } type="file" id="image-upload" accept="image/*" style={{ display: 'none' }}  />
        </div>

        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" placeholder="Nombre de la mascota"required />

        <label htmlFor="species">Especie:</label>
        <select id="species" name="species" required>
          <option value="dog">Perro</option>
          <option value="cat">Gato</option>
        </select>

        <label htmlFor="breed">Raza:</label>
        <input type="text" id="breed" name="breed" placeholder="Raza"/>

        <label htmlFor="age">Edad:</label>
        <input type="number" id="age" name="age" placeholder="Edad en años" />

        <label htmlFor="description">Descripción:</label>
        <textarea id="description" name="description" rows={4} placeholder="Escribe una breve descripción" ></textarea>

        <label htmlFor="medicalHistory">Historial Médico:</label>
        <textarea id="medicalHistory" name="medicalHistory" rows={4} placeholder="Historial médico de la mascota"></textarea>

        <input className="btn-input" type="submit" value="Guardar" />
      </form>
      </div>
    </main>
  )
}
