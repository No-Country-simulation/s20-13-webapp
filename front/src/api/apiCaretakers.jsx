import { isAxiosError } from "axios";
import api from "../lib/axios";

export default async function getCaretakers(filters={}){
  
   try {
    const queryParams = new URLSearchParams(filters).toString();
    const request = await api.get(`/users/?role=caretaker&${queryParams}`);
    return request.data;
   } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
   }

}