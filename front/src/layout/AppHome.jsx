import { Outlet } from "react-router";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import { useUser } from "../hooks/useUser";


export default function AppHome() {
    const {user}=useUser()
    
    return (
        <>
            <Header user={user}/>
            <Outlet />
            <Footer />
        </>
    )
}
