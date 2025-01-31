import { Outlet, useNavigate } from "react-router";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";


export default function UserLayout() {
    const navigate=useNavigate()
    const {user,handleLogout}=useUser()

    return (
        <>
            <Header user={user} handleLogout={handleLogout}/>
            <Outlet />
            <Footer />
        </>
    )
}
