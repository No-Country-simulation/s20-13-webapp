import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from '../lib/axios'
import { isAxiosError } from 'axios'
import OwnerForm1 from '../components/auth/OwnerForm1'
import OwnerForm2 from '../components/auth/OwnerForm2'
import OwnerForm3 from '../components/auth/OwnerForm3'
import RegisterCongratulations from '../components/auth/RegisterCongratulations'

export default function OwnerRegisterViews() {

    const params = useParams()
    const id = params.id
    const [user, setUser] = useState(null)
    const [currentForm, setCurrentForm] = useState(1);

    const nextForm = () => {
        setCurrentForm(currentForm + 1);
    };

    const prevForm = () => {
        setCurrentForm(currentForm - 1);
    };
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const request = await api(`/users/${id}`)
                setUser(request.data)
            } catch (error) {
                if (isAxiosError(error) && error.response) {
                    throw new Error(error.response.data.error)
                }
            }
        }
        fetchUser()

    }, [])

    return (
        <>
            {currentForm === 1 && <OwnerForm1 user={user} nextForm={nextForm} />}
            {currentForm === 2 && <OwnerForm2  prevForm={prevForm} nextForm={nextForm} />}
            {currentForm === 3 && <OwnerForm3 prevForm={prevForm} />}
            {currentForm === 4 && <RegisterCongratulations prevForm={prevForm} />}
        </>
    )
}
