import { Outlet } from "react-router";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import axios from "axios"
import { useEffect } from "react"

export default function AppHome() {


    useEffect(() => async () => {
        const request = await axios("http://localhost:3000/api/auth/user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('pawpetToken')}`
            }

        })
        console.log(request.data)

    }, [localStorage.getItem('pawpetToken')])


    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
