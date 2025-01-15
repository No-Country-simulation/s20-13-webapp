import { Outlet } from "react-router";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";

export default function AppHome() {
    return (
       <>
       <Header/>
       <Outlet/>
       <Footer/>
       </>
    )
}
