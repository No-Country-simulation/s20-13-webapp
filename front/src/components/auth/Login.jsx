
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router';
import api from '../../lib/axios';
import { isAxiosError } from 'axios';

export default function Login() {

    const navigate = useNavigate()

    const handleLogin = async (credentials, role) => {
        try {
            const request = await api.post('/auth/login', {
                credentials: credentials.credential,
                role
            })
            localStorage.setItem('pawpetToken', request.data)
            navigate("/")
            window.location.reload()

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error)
            }
        }
    }




    return (
        <main className="fondologin">


            <div className='google-container'>

                <h1 className='login-title'>Iniciar Sesión</h1>

                <div >
                    <p className='google-p'>Ingresar como Cuidador</p>
                    <div className="button-container">
                        <button className="google-button" style={{ borderRadius: "10px" }}>
                            <GoogleLogin onSuccess={(credentials) => handleLogin(credentials, "caretaker")} onError={() => console.log('Error')} />

                        </button>

                    </div>
                    <div>
                        <p className='google-p'>Ingresar como Dueño</p>
                        <div className="button-container">
                            <button className="google-button" style={{ borderRadius: "10px" }}>
                                <GoogleLogin
                                    onSuccess={(credentials) => handleLogin(credentials, "caretaker")} onError={() => console.log('Error')} />

                            </button>

                        </div>

                    </div>


                </div>

            </div>

        </main>
    );
};

