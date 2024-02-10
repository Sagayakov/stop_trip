import styles from 'pages/mySettings/libr/mySettings.module.scss';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SettingTypes } from 'pages/mySettings/types/settingTypes.ts';
import { useEffect, useLayoutEffect } from 'react';
import { getAccessTokenWithRefresh } from 'shared/model/getAccessTokenWithRefresh.ts';
import { useAppDispatch } from 'app/store/hooks.ts';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { toast } from 'react-toastify';
import {
    fetchUser,
    useGetUserQuery,
    useSetPasswordMutation,
    useSetUserMutation,
} from 'app/api/fetchUser.ts';
import { MySettingForm } from 'widgets/mySetting/MySettingForm.tsx';

const MySettings = () => {
    const { t } = useTranslation();
    const { handleSubmit, control, formState, watch } = useForm<SettingTypes>({
        mode: 'all',
    });
    const { isValid } = formState;
    const dispatch = useAppDispatch();
    const { accessToken } = getTokensFromStorage();
    const [setUser, response] = useSetUserMutation();
    const [setPassword, responsePassword] = useSetPasswordMutation();
    const { data: userData } = useGetUserQuery(accessToken);

    useLayoutEffect(() => {
        const { refreshToken } = getTokensFromStorage();
        getAccessTokenWithRefresh(dispatch, refreshToken);
    }, [dispatch]);
    useEffect(() => {
        dispatch(fetchUser.util?.invalidateTags(['User'])); //очищаем кэш по юзеру
    }, []);

    const onsubmit: SubmitHandler<SettingTypes> = async (
        data: SettingTypes
    ) => {
        const { refreshToken } = getTokensFromStorage();
        await getAccessTokenWithRefresh(dispatch, refreshToken);
        const { accessToken: token } = getTokensFromStorage();

        if (
            data.current_password &&
            data.new_password &&
            data.re_new_password
        ) {
            const body = {
                current_password: data.current_password,
                new_password: data.new_password,
                re_new_password: data.re_new_password,
            };
            await setPassword({ body, token: token })
                .unwrap()
                .then(() => toast.success(t('my-settings.success')))
                .catch(() => {
                    toast.error(t('errors.add-announcement-error'));
                });
        }

        if (
            (data.phone && data.phone !== userData?.phone) ||
            (data.full_name && data.full_name !== userData?.full_name)
        ) {
            await setUser({ body: data, token: token })
                .unwrap()
                .then(() => toast.success(t('my-settings.success')))
                .catch(() => {
                    toast.error(t('errors.add-announcement-error'));
                });
        }
    };

    const newPassword = watch('new_password');
    const currentPassword = watch('current_password');
    const reNewPassword = watch('re_new_password');

    return (
        <section className={styles.my_setting}>
            <div className={styles.bread_crumbs}>
                <NavLink to="/">{t('category-page.main-link')}</NavLink>
                &nbsp;{` > ${t('my-settings.setting')}`}
            </div>
            <h1 className={styles.title}>{t('my-settings.setting')}</h1>
            {userData && (
                <p className={styles.user_email}>
                    {t('my-settings.mail-address')}: <b>{userData.email}</b>
                </p>
            )}
            <form
                className={styles.setting_form}
                onSubmit={handleSubmit(onsubmit)}
            >
                <MySettingForm
                    control={control}
                    watch={watch}
                    formState={formState}
                    isLoadingPassword={responsePassword.isLoading}
                    isLoadingMutation={response.isLoading}
                    mutationErrors={response.error}
                    passwordErrors={responsePassword.error}
                />
                <div className={styles.button_wrapper}>
                    <input
                        type="submit"
                        value={t('myAnnouncements.edit')}
                        disabled={
                            !isValid ||
                            (newPassword &&
                                currentPassword &&
                                newPassword === currentPassword) ||
                            newPassword !== reNewPassword
                        }
                    />
                    <button className={styles.goBack}>
                        {t('add-page.back')}
                    </button>
                </div>
            </form>
        </section>
    );
};
export default MySettings;
