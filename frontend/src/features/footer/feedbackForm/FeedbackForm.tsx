import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Pencil } from 'shared/ui/icons/icons-tools/Pencil.tsx';
import { getId } from './libr/handlers';
import { TypesFeedbackForm } from './libr/typesFeedback';
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground.tsx';
import { useState } from 'react';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/footer/footer.module.scss';
import { InputTypeSubmit } from 'entities/universalEntites';

export const FeedbackForm = () => {
    const [loading, setLoating] = useState(false);
    const { accessToken } = getTokensFromStorage();
    const { t } = useTranslation();

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { isValid },
    } = useForm<TypesFeedbackForm>();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.currentTarget.value.length >= 900) {
            toast.error(`${t('main-page.toast-feedback')}`);
        }
    };

    const onFocusGetId = () => getId(import.meta.env.VITE_BASE_URL, setValue);

    const onsubmit: SubmitHandler<TypesFeedbackForm> = async (
        feedbackData: TypesFeedbackForm
    ) => {
        const body = JSON.stringify(feedbackData);
        const url = import.meta.env.VITE_BASE_URL;
        if (accessToken) {
            setLoating(true);
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
                    toast.error(`${t('main-page.toast-wrong')}`);
                } else {
                    setTimeout(() => {
                        setLoating(false);
                        reset({ text: '' });
                        toast.success(`${t('main-page.toast-thanks')}`);
                    }, 2000);
                }
            } catch (error) {
                toast.error(`${t('main-page.toast-wrong')}`);
            }
        } else {
            toast.error(`${t('main-page.toast-feedback-login')}`);
        }
    };

    return (
        <div className={styles.feedback}>
            <div className={styles.feed}>
                <Pencil color="#02C66E" />
                <p>{t('main-page.suggestions')}</p>
            </div>
            <form onSubmit={handleSubmit(onsubmit)}>
                <Controller
                    name="text"
                    control={control}
                    rules={{ minLength: 10, maxLength: 900 }}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            placeholder={t('main-page.enter-text')}
                            minLength={10}
                            maxLength={900}
                            onFocus={onFocusGetId}
                            onChange={(event) => {
                                field.onChange(event.target.value);
                                handleChange(event);
                            }}
                        />
                    )}
                />
                <InputTypeSubmit
                    disabled={!isValid}
                    value={t('main-page.send')}
                    style={{ backgroundColor: isValid ? '#02c66e' : 'gray' }}
                />
            </form>
            {loading && <LoadingWithBackground />}
        </div>
    );
};
