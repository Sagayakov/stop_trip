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
    useGetUserQuery,
    useSetPasswordMutation,
    useSetUserMutation,
} from 'app/api/fetchUser.ts';
import { MySettingForm } from 'widgets/mySetting/MySettingForm.tsx';

const MySettings = () => {
    const { t } = useTranslation();
    const { handleSubmit, control, formState, watch, clearErrors } = useForm<SettingTypes>({
        mode: 'all',
    });
    const dispatch = useAppDispatch();
    const { accessToken } = getTokensFromStorage();
    const [setUser, { isLoading: isLoadingMutation }] = useSetUserMutation();
    const [
        setPassword,
        { isLoading: isLoadingPassword, error: passwordErrors },
    ] = useSetPasswordMutation();
    const { data: userData } = useGetUserQuery(accessToken);

    useLayoutEffect(() => {
        const { refreshToken } = getTokensFromStorage();
        getAccessTokenWithRefresh(dispatch, refreshToken);
    }, [dispatch]);

    const onsubmit: SubmitHandler<SettingTypes> = async (data: SettingTypes) => {
        let success = false;
        if (data.current_password && data.new_password && data.re_new_password) {
            const body = {
                current_password: data.current_password,
                new_password: data.new_password,
                re_new_password: data.re_new_password,
            };
            const res = await setPassword({ body, token: accessToken });
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if(!res?.error) {
                toast.success(t('my-settings.password-success'));
            }
        }
        if ((data.phone || data.full_name) && (data.phone !== userData?.phone || data.full_name !== userData?.full_name)) {
            const res = await setUser({ body: data, token: accessToken });
            if(res) success = true;
        }
        success && toast.success(t('my-settings.success'));
    };
    useEffect(() => {
        if(passwordErrors){
            toast.error(t('errors.add-announcement-error'));
        }
    }, [passwordErrors]);

    return (
        <section className={styles.my_setting}>
            <div className={styles.bread_crumbs}>
                <NavLink to="/">{t('category-page.main-link')}</NavLink>
                &nbsp;{` > ${t('my-settings.setting')}`}
            </div>
            <h1 className={styles.title}>{t('my-settings.setting')}</h1>
            <form
                className={styles.setting_form}
                onSubmit={handleSubmit(onsubmit)}
            >
                <MySettingForm
                    control={control}
                    watch={watch}
                    formState={formState}
                    isLoadingPassword={isLoadingPassword}
                    isLoadingMutation={isLoadingMutation}
                    passwordErrors={passwordErrors}
                    clearErrors={clearErrors}
                />
                <div className={styles.button_wrapper}>
                    <input type="submit" value={t('myAnnouncements.edit')} />
                    <button className={styles.goBack}>
                        {t('add-page.back')}
                    </button>
                </div>
            </form>
        </section>
    );
};
export default MySettings;
