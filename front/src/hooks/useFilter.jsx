import { useState } from "react"

export default function useFilter(){

    const [neighborhood, setNeighborhood] = useState({
        neighborhood:""
    })



    return {
        neighborhood,
        setNeighborhood
    }

}