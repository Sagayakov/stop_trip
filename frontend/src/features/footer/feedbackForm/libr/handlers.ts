import { UseFormSetValue } from 'react-hook-form';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { TypesFeedbackForm } from './typesFeedback';

export const getId = async (
    url: string,
    setValue: UseFormSetValue<TypesFeedbackForm>
) => {
    const { accessToken } = getTokensFromStorage();
    try {
        const response = await fetch(`${url}/api/auth/users/me/`, {
            method: 'GET',
            headers: {
                authorization: ` Bearer ${accessToken}`,
            },
        });
        if (response.status === 200) {
            const data = await response.json();
            setValue('owner', data.id);
        }
    } catch (error) {
        console.log(error);
    }
};
