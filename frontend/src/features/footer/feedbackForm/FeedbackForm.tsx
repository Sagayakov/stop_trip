import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Pencil } from 'shared/ui/icons/icons-tools/Pencil.tsx';
import { getId } from './libr/handlers';
import { TypesFeedbackForm } from './libr/typesFeedback';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';
import { useState } from 'react';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/footer/footer.module.scss';
<<<<<<< HEAD
import { InputTypeSubmit } from 'entities/universalEntites';
import { getAccessTokenWithRefresh } from 'shared/model/getAccessTokenWithRefresh.ts';
import { useAppDispatch } from 'app/store/hooks.ts';
=======
import { InputTypeSubmit } from 'entity/universalEntites/InputTypeSubmit.tsx';
import { url } from 'shared/const/url';
>>>>>>> f31783f (feat: add test environment & 1st test)

export const FeedbackForm = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const { refreshToken } = getTokensFromStorage();
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

    const onFocusGetId = () => getId(url!, setValue);

    const onsubmit: SubmitHandler<TypesFeedbackForm> = async (
        feedbackData: TypesFeedbackForm
    ) => {
        getAccessTokenWithRefresh(dispatch, refreshToken); //сначала обновляем accessToken
        const { accessToken } = getTokensFromStorage();
        const body = JSON.stringify(feedbackData);

        if (accessToken) {
            setLoading(true);
            try {
                const response = await fetch(`${url}/api/feedback/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body,
                });
                if (!response.ok) {
                    toast.error(`${t('main-page.toast-wrong')}`);
                } else {
                    setTimeout(() => {
                        setLoading(false);
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
            <form onSubmit={handleSubmit(onsubmit)} id="form-feedback">
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