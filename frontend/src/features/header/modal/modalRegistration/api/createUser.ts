import { NewUser } from '../libr/RegistrationTypes';

export const createUser = async (body: NewUser) => {
    const url = import.meta.env.VITE_BASE_URL;
    try {
        const responce = await fetch(`${url}/api/auth/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if(responce.status === 500){
            console.log(500)
            await fetch(`${url}api/auth/users/resend_activation/`);
        }
        const data = await responce.json();
        console.log('data', data);
        if ((await responce).ok) {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
};
