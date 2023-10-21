import { saveTokensAuthToCookie } from '../../../../../app/cookie/cookieAuth';
import { UserEnter } from '../libr/RegistrationTypes';

export const signIn = async (body: UserEnter) => {
    const url = import.meta.env.VITE_BASE_URL;
    try {
        const responce = await fetch(`${url}/api/auth/jwt/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await responce.json();
        console.log('data', data);
        if ((await responce).ok) {
            saveTokensAuthToCookie(data.access, data.refresh)
            return data;
        }
    } catch (e) {
        console.log(e);
    }
};
