import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Pencil } from '../../../shared/ui/icons/icons-tools/Pencil';
import { getId, HandleSubmitFeedback } from './libr/handlers';
import { TypesFeedbackForm } from './libr/typesFeedback';
import { LoadingWithBackground } from '../../../entities/loading/LoadingWithBackground';
import { useState } from 'react';
import { getTokensFromStorage } from '../../../widgets/header/libr/authentication/getTokensFromStorage';
import { useTranslation } from 'react-i18next';

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
        if (accessToken) {
            const url = import.meta.env.VITE_BASE_URL;
            setLoating(true);
            setTimeout(() => {
                HandleSubmitFeedback(url, feedbackData, reset);
                setLoating(false);
            }, 2000);
        } else {
            toast.error(`${t('main-page.toast-feedback-login')}`);
        }
    };

    return (
        <div className="feedback">
            <div className="feed">
                <Pencil color="#02C66E" />
                <p>{t('main-page.suggestions')}</p>
            </div>
            <form onSubmit={handleSubmit(onsubmit)}>
                <Controller
                    name="feedback"
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
                <input
                    type="submit"
                    value={t('main-page.send')}
                    disabled={!isValid}
                    style={{ backgroundColor: isValid ? '#02c66e' : 'gray' }}
                />
            </form>
            {loading && <LoadingWithBackground />}
        </div>
    );
};
