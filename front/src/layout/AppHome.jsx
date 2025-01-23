import { Outlet } from "react-router";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import { useEffect, useState } from "react"
import api from "../lib/axios";
import { isAxiosError } from "axios";


export default function AppHome() {
    const [user,setUser]=useState(null)
   

    useEffect(() => async () => {

        try {

            const request = await api(`/auth/user`)
            setUser(request.data)
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
        }


    }, [localStorage.getItem('pawpetToken')])

  
    return (
        <>
            <Header user={user}/>
            <Outlet />
            <Footer />
        </>
    )
}
