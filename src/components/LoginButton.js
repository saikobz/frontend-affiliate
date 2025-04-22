// ✅ LoginButton.js
import React from 'react';
import { KEYCLOAK_BASE, REDIRECT_URI } from '../utils/config';

function LoginButton() {
    const loginUrl = `${KEYCLOAK_BASE}/protocol/openid-connect/auth?client_id=affiliator-client&response_type=token&redirect_uri=${REDIRECT_URI}`;

    return (
        <div className="text-center my-4">
            <a href={loginUrl} className="btn btn-primary">
                Login with Keycloak
            </a>
        </div>
    );
}

export default LoginButton;