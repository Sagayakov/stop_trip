import { UseFormReset, UseFormSetValue } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { TypesFeedbackForm } from './typesFeedback';
import { useTranslation } from 'react-i18next';

export const HandleSubmitFeedback = async (
    url: string,
    feedbackData: TypesFeedbackForm,
    reset: UseFormReset<TypesFeedbackForm>
) => {
    const body = JSON.stringify(feedbackData);
    const { accessToken } = getTokensFromStorage();
    const { t } = useTranslation();

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
            toast.error(`${t('advert-page.toast-wrong')}`);
        } else {
            reset({ feedback: '' });
            toast.success(`${t('advert-page.toast-thanks')}`);
        }
    } catch (error) {
        toast.error(`${t('advert-page.toast-wrong')}`);
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
            console.log(data);
            setValue('owner', data.id);
        }
    } catch (error) {
        console.log(error);
    }
};
