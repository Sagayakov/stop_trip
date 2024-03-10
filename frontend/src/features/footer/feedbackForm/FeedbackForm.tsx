import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Pencil } from 'shared/ui/icons/icons-tools/Pencil.tsx';
import { TypesFeedbackForm } from './libr/typesFeedback';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';
import { useEffect, useState } from 'react';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/footer/footer.module.scss';
import { InputTypeSubmit } from 'entity/universalEntites';
import { getAccessTokenWithRefresh } from 'shared/model/getAccessTokenWithRefresh.ts';
import { useAppDispatch } from 'app/store/hooks.ts';
import { useLazyGetUserQuery } from 'app/api/fetchUser.ts';
import { url } from 'shared/const/url.ts';

interface Props {
    setShowCaptcha: React.Dispatch<React.SetStateAction<boolean>>;
    showCaptcha: boolean;
}

export const FeedbackForm = ({ setShowCaptcha, showCaptcha }: Props) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const { refreshToken } = getTokensFromStorage();
    const { t } = useTranslation();

    const [getUserId, { data: userInfo }] = useLazyGetUserQuery();

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { isValid, touchedFields },
    } = useForm<TypesFeedbackForm>();

    const onFocusGetId = async () => {
        if (!showCaptcha) setShowCaptcha(true);
        if (!userInfo && localStorage.getItem('isAuth') === 'true') {
            //получаем id юзера
            await getAccessTokenWithRefresh(dispatch, refreshToken);
            await getUserId('');
        }
    };

    const onsubmit: SubmitHandler<TypesFeedbackForm> = async (
        feedbackData: TypesFeedbackForm
    ) => {
        //если Олег скажет точные api_key и site_key, можно попробовать достучаться до гугла
        //это для капчи
        // const captchaToken = await getReCaptchaToken();
        // const createMark = async() => {
        //     try{
        //         const response = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.CAPTCHA_PROJECT_ID}/assessments?key=${process.env.CAPTCHA_API_KEY}`, {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json; charset=utf-8",
        //             },
        //             body: JSON.stringify({
        //                 "event": {
        //                     "token": captchaToken,
        //                     "siteKey": `${process.env.CAPTCHA_SITE_KEY}`,
        //                     "expectedAction": "USER_ACTION"
        //                 }
        //             })
        //         });
        //         const data = await response.json();
        //         console.log(data);
        //     }catch (error) {
        //         console.log(error);
        //     }
        // }
        // createMark();
        //это для капчи

        if (feedbackData.text.length > 900 || feedbackData.text.length < 10) {
            const toastId = 'feedback length error toast';
            return toast.error(t('feedback.feedback-message'), { toastId });
        }
        if (!userInfo) await onFocusGetId(); //еще раз проверяем что у нас есть id юзера
        await getAccessTokenWithRefresh(dispatch, refreshToken); //сначала обновляем accessToken
        const { accessToken } = getTokensFromStorage();
        const body = JSON.stringify(feedbackData);

        if (accessToken) {
            setLoading(true);
            try {
                const response = await fetch(`${url}/api/feedback/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body,
                });
                if (!response.ok) {
                    const toastId = 'feedback wrong toast';
                    toast.error(`${t('main-page.toast-wrong')}`, { toastId });
                } else {
                    reset({ text: '' });
                    const toastId = 'feedback success toast';
                    toast.success(`${t('main-page.toast-thanks')}`, {
                        toastId,
                    });
                }
            } catch (error) {
                const toastId = 'feedback error toast';
                toast.error(`${t('main-page.toast-wrong')}`, { toastId });
            }
            setLoading(false);
        } else {
            const toastId = 'feedback login error toast';
            toast.error(`${t('main-page.toast-feedback-login')}`, { toastId });
        }
        setShowCaptcha(false);
    };

    useEffect(() => {
        userInfo?.id && setValue('owner', userInfo.id);
    }, [userInfo, setValue]);

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
                    rules={{
                        required: true,
                        minLength: {
                            value: 10,
                            message: t('feedback.feedback-message'),
                        },
                        maxLength: {
                            value: 900,
                            message: t('feedback.feedback-message'),
                        },
                        onChange: (event) => {
                            const toastId = 'feedback long message error toast';
                            event.target.value.length > 900 &&
                                toast.error(t('feedback.feedback-message'), {
                                    toastId,
                                });
                        },
                    }}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            placeholder={t('main-page.enter-text')}
                            style={
                                !isValid && touchedFields.text
                                    ? { border: '1px solid #ff2d55' }
                                    : {}
                            }
                            onFocus={onFocusGetId}
                            onChange={(event) =>
                                field.onChange(event.target.value)
                            }
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
