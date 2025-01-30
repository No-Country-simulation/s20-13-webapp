import { useState } from "react"
import ErrorMessage from "../ui/ErrorMessage"
import api from "../../lib/axios"
import { isAxiosError } from "axios"

export default function ServiceForm({id}) {
    const [service, setService] = useState("")
    const [costPerHour, setCostPerHour] = useState("")
    const [costPerDay, setCostPerDay] = useState("")
    const [days, setDays] = useState([])
    const [errors, setErrors] = useState({})

    const [data, setData] = useState({
        service: "",
        isActive: "",
        cost: { costPerHour: "", costPerDay: "" },
        availability: []
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        
        if (name === "service") {
            setService(value)
            setCostPerHour("")
            setCostPerDay("")
            setErrors({ ...errors, service: "" })
        }

        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDaySelect = (e) => {
        const selectedDay = e.target.value
        if (selectedDay && !days.includes(selectedDay)) {
            setDays([...days, selectedDay])
            setErrors({ ...errors, availability: "" })
        }
    }

    const removeDay = (day) => {
        setDays(days.filter((d) => d !== day))
    }

    const handleSubmit =async (e) => {
        e.preventDefault();

        let newErrors = {};
        
        if (!data.service) newErrors.service = "El servicio es obligatorio.";
        if (!data.isActive) newErrors.isActive = "Selecciona si el servicio está disponible.";
        if (!days.length) newErrors.availability = "Selecciona al menos un día.";
        
        if (service === "caretaker") {
            if (!costPerHour) newErrors.costPerHour = "El costo por hora es obligatorio.";
            if (!costPerDay) newErrors.costPerDay = "El costo por día es obligatorio.";
        } else {
            if (!costPerHour) newErrors.costPerHour = "El costo por hora es obligatorio.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const updatedData = {
            ...data,
            cost: { costPerHour, costPerDay },
            availability: days
        };

        setData(updatedData);
       
        try {
            const request=await api.put(`/users/${id}`,updatedData)
                console.log(request)
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
        }

    };

    return (
        <main className="formuaaa">
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                    <h2>COMPLETA LOS DATOS DE TU SERVICIO</h2>

                    <div className="form-group">
                        <label htmlFor="service">Servicio:</label>
                        <select id="service" name="service" onChange={handleChange}>
                            <option value="">-- Selecciona una opción --</option>
                            <option value="dogwalker">Paseador de Perros</option>
                            <option value="caretaker">Cuidador de Mascotas</option>
                        </select>
                        {errors.service && <ErrorMessage>{errors.service}</ErrorMessage>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="isActive">Disponibilidad del servicio</label>
                        <select id="isActive" name="isActive" onChange={handleChange}>
                            <option value="">-- Selecciona una opción --</option>
                            <option value="true">Disponible</option>
                            <option value="false">No Disponible</option>
                        </select>
                        {errors.isActive && <ErrorMessage>{errors.isActive}</ErrorMessage>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="cost">Costo del servicio:</label>
                        {service === "caretaker" ? (
                            <>
                                <input
                                    type="number"
                                    placeholder="Costo por hora"
                                    value={costPerHour}
                                    onChange={(e) => setCostPerHour(e.target.value)}
                                />
                                {errors.costPerHour && <ErrorMessage>{errors.costPerHour}</ErrorMessage>}

                                <input
                                    type="number"
                                    placeholder="Costo por día"
                                    value={costPerDay}
                                    onChange={(e) => setCostPerDay(e.target.value)}
                                />
                                {errors.costPerDay && <ErrorMessage>{errors.costPerDay}</ErrorMessage>}
                            </>
                        ) : (
                            <>
                                <input
                                    type="number"
                                    placeholder="Costo por hora"
                                    value={costPerHour}
                                    onChange={(e) =>{
                                        setCostPerHour(e.target.value)
                                    }}
                                />
                                {errors.costPerHour && <ErrorMessage>{errors.costPerHour}</ErrorMessage>}
                            </>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="days">Disponibilidad de días</label>
                        <select id="days" name="days" onChange={handleDaySelect}>
                            <option value="">-- Selecciona una opción --</option>
                            <option value="Lunes">Lunes</option>
                            <option value="Martes">Martes</option>
                            <option value="Miércoles">Miércoles</option>
                            <option value="Jueves">Jueves</option>
                            <option value="Viernes">Viernes</option>
                            <option value="Sábado">Sábado</option>
                            <option value="Domingo">Domingo</option>
                        </select>
                        {errors.availability && <ErrorMessage>{errors.availability}</ErrorMessage>}
                    </div>

                    {days.length > 0 && (
                        <div className="selected-days">
                            {days.map((day, index) => (
                                <button key={index} className="btn-day" type="button" onClick={() => removeDay(day)}>
                                    {day}
                                </button>
                            ))}
                        </div>
                    )}

                    <input className="btn-input" type="submit" value="Guardar" />
                </form>
            </div>
        </main>
    )
}
