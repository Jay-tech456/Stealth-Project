import { useState } from 'react';
import '../styles/auth.css';
import Login from '../authentications/login';
import SignUp from '../authentications/signup';
function Authentications() {
    const [toggleSwitch, setToggleSwitch] = useState('signin');
    

    return ( 
        <div>
            { toggleSwitch === 'signin' && <Login  setToggleSwitch={setToggleSwitch}/>}
            { toggleSwitch === 'signup' && <SignUp setToggleSwitch={setToggleSwitch}/> }
        </div>
     );
}

export default Authentications;