import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
const Authentication = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

    return (
        <div>
            {isAuthenticated ?
                <button className='authenticationButton' onClick={() => logout()}>Logout</button>
                :
                <button className='authenticationButton' onClick={() => loginWithRedirect()}>Login</button>
            }
        </div>
    );
};

export default Authentication;