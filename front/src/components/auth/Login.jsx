
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Login() {

   const navigate=useNavigate()

    const handleLogin = async (credentials,role) => {
        try {
            const request = await axios.post("http://localhost:3000/api/auth/login", {
                credentials: credentials.credential,
                role
            })
            localStorage.setItem('pawpetToken', request.data)
            navigate("/home")

        } catch (error) {
            console.log(error)
        }
    }

   

    return (
        <div>

            <div>
                <p>Iniciar Sesión como cuidador</p>
                <GoogleLogin onSuccess={(credentials)=>handleLogin(credentials,"caretaker")} onError={() => console.log('Error')} />

            </div>
            <div>
                <p>Iniciar Sesión como dueño</p>
                <GoogleLogin onSuccess={(credentials)=>handleLogin(credentials,"owner")} onError={() => console.log('Error')} />

            </div>

        </div>
    );
};

