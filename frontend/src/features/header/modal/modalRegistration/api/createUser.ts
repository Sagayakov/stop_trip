import { NewUser } from '../libr/RegistrationTypes';

export const createUser = async (body: NewUser) => {
    try {
        const responce = await fetch('api/auth/users', {
            method: 'POST',
            body: JSON.stringify(body),
        });

        const data = responce.json();
        console.log(data);
    } catch (e) {
        console.log(e);
    }
};
