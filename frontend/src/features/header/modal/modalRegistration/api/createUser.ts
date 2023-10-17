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

        const data = await responce.json();
        console.log('data', data);
        return data;
    } catch (e) {
        console.log(e);
    }
};
