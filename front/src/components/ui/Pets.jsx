import React, { useEffect, useState } from 'react'
import api from '../../lib/axios';
import { isAxiosError } from 'axios';

export default function Pets({ id }) {
    const [pets, setPets] = useState([])
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const { data } = await api(`/pets/user/${id}`);
                setPets(data)
            } catch (error) {
                if (isAxiosError(error) && error.response) {
                    console.log(error.response.data);
                }
            }
        };
        fetchPets();
    }, [id]);

    console.log(pets)
    return (
        <div>

            <div className="pet-card">

                {
                    pets ? pets.map(pet => (
                        <div key={pet._id} className="owner-profile">
                            <img
                                className="picture-profile"
                                src={pets[0].image}
                                alt="Imagen Mascota"
                            />
                            <div>
                                <h2 className=""></h2>
                                <p>

                                </p>
                            </div>
                        </div>
                    )) : <p>No se encontraron mascotas</p>
                }
            </div>
        </div>
    )
}
