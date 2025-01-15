
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
   

    const handleLogin=(credentials)=>{
        console.log(credentials)
    }
  
    return (
      <div>
        
          <div>
            <GoogleLogin onSuccess={handleLogin} onError={() => console.log('Error')} />
           
          </div>
      
      </div>
    );
  };

