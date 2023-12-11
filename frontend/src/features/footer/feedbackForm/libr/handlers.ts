import { UseFormReset, UseFormSetValue } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getTokensFromStorage } from '../../../../widgets/header/libr/authentication/getTokensFromStorage';
import { TypesFeedbackForm } from './typesFeedback';

export const handleSubmitFeedback = async (
    url: string,
    feedbackData: TypesFeedbackForm,
    reset: UseFormReset<TypesFeedbackForm>
) => {
    const body = JSON.stringify(feedbackData);
    const { accessToken } = getTokensFromStorage();
    try {
        const response = await fetch(`${url}/api/feedback/`, {
            method: 'POST',
            headers: {
                'X-Csrftoken': `${accessToken}`,
                'Content-Type': 'application/json',
                authorization: ` Bearer ${accessToken}`,
            },
            body,
        });
        if (!response.ok) {
            toast.error('Что-то пошло не так, пожалуйста, попробуйте снова!');
        } else {
            reset({ feedback: '' });
            toast.success('Спасибо за обратную связь!');
        }
    } catch (error) {
        toast.error('Что-то пошло не так, пожалуйста, попробуйте снова!');
    }
};

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
            console.log(data)
            setValue('owner', data.id);
        }
    } catch (error) {
        console.log(error);
    }
};
