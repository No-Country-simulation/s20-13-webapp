
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router';
import api from '../../lib/axios';
import { isAxiosError } from 'axios';

export default function Login() {

   const navigate=useNavigate()

    const handleLogin = async (credentials,role) => {
        try {
            const request = await api.post('/auth/login', {
                credentials: credentials.credential,
                role
            })
            localStorage.setItem('pawpetToken', request.data)
            navigate("/")

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
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

