import { createContext, useEffect, useState } from "react";
import api from "../lib/axios";
import { isAxiosError } from "axios";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {

        const fetchUser = async () => {
            try {

                const request = await api(`/auth/user`)
                setUser(request.data)
            } catch (error) {
                if (isAxiosError(error) && error.response) {
                    throw new Error(error.response.data.error)
                }
            }

        }

        if (localStorage.getItem('pawpetToken')) {
            fetchUser()
        }

    }, [])
    const handleLogout = () => {
        localStorage.removeItem("pawpetToken")
        setUser(null)
        
      }

    return (
        <userContext.Provider value={{ user, setUser,handleLogout }}>
            {children}
        </userContext.Provider>
    )
}