import styles from 'pages/mySettings/libr/mySettings.module.scss';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SettingTypes } from 'pages/mySettings/types/settingTypes.ts';
import { useEffect } from 'react';
import { useAppDispatch } from 'app/store/hooks.ts';
import { toast } from 'react-toastify';
import {
    fetchUser,
    useGetUserQuery,
    useSetPasswordMutation,
    useSetUserMutation,
} from 'app/api/fetchUser.ts';
import { MySettingForm } from 'widgets/mySetting/MySettingForm.tsx';
import { SettingMessengers } from 'widgets/settingMessengers';
import { scrollToTop } from 'shared/utils/scrollToTop';
import { useNavigate } from 'react-router-dom';

const MySettings = () => {
    const { t } = useTranslation();
    const { handleSubmit, control, formState, watch } = useForm<SettingTypes>({
        mode: 'all',
    });
    const { isValid } = formState;
    const dispatch = useAppDispatch();
    const [setUser, response] = useSetUserMutation();
    const [setPassword, responsePassword] = useSetPasswordMutation();
    const { data: userData } = useGetUserQuery('');
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            dispatch(fetchUser.util?.invalidateTags(['User'])); //очищаем кэш по юзеру
        };
    }, []);

    const onsubmit: SubmitHandler<SettingTypes> = async (
        data: SettingTypes
    ) => {
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
            await setPassword(body)
                .unwrap()
                .then(() => {
                    const toastId = 'edit password success toast';
                    toast.success(t('my-settings.success'), { toastId });
                })
                .catch(() => {
                    const toastId = 'edit password error toast';
                    toast.error(t('errors.add-announcement-error'), {
                        toastId,
                    });
                });
        }

        if (
            (data.phone && data.phone !== userData?.phone) ||
            (data.full_name && data.full_name !== userData?.full_name)
        ) {
            await setUser(data)
                .unwrap()
                .then(() => {
                    const toastId = 'edit user success toast';
                    toast.success(t('my-settings.success'), { toastId });
                })
                .catch(() => {
                    const toastId = 'edit password error toast';
                    toast.error(t('errors.add-announcement-error'), {
                        toastId,
                    });
                });
        }
    };

    const newPassword = watch('new_password');
    const currentPassword = watch('current_password');
    const reNewPassword = watch('re_new_password');

    const handleCancel = () => {
        scrollToTop();
        navigate('/');
    };

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
            <SettingMessengers />
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
                    <button className={styles.goBack} onClick={handleCancel}>
                        {t('add-page.cancel')}
                    </button>
                </div>
            </form>
        </section>
    );
};
export default MySettings;
