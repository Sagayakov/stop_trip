import styles from 'pages/mySettings/libr/mySettings.module.scss';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SettingTypes } from 'pages/mySettings/types/settingTypes.ts';
import { useLayoutEffect, useState } from 'react';
import { getAccessTokenWithRefresh } from 'shared/model/getAccessTokenWithRefresh.ts';
import { useAppDispatch } from 'app/store/hooks.ts';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { setLoading } from 'entities/loading/model/setLoadingSlice.ts';
import { toast } from 'react-toastify';

interface User{
    id?: number,
    full_name?: string,
    phone?: string,
    email?: string,
    date_joined?: string,
}

const MySettings = () => {
    const { t } = useTranslation();
    const [user, setUser] = useState<User | undefined>(undefined);
    const { handleSubmit, control } = useForm<SettingTypes>({
        mode: 'onBlur',
    });
    const dispatch = useAppDispatch();
    const { refreshToken } = getTokensFromStorage();
    const onsubmit: SubmitHandler<SettingTypes> = (data: SettingTypes) => {
        const url = import.meta.env.VITE_BASE_URL;
        const changeUserData = async (body: SettingTypes, access: string) => {
            try {
                dispatch(setLoading(true));
                const response = await fetch (`${url}/api/auth/users/me/`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "Application/json",
                        "Authorization": `Bearer ${access}`,
                    },
                    body: JSON.stringify(body),
                });
                if(response.ok){
                    dispatch(setLoading(false));
                    toast.success(t('advert-page.advertisement-added'));
                }
            } catch (error) {
                console.log(error)
                dispatch(setLoading(false));
                toast.error(`${t('errors.add-announcement-error')}`);
            }
        };
        const { accessToken } = getTokensFromStorage();
        changeUserData(data, accessToken);
    };
    useLayoutEffect(() => {
        dispatch(setLoading(true));
        getAccessTokenWithRefresh(dispatch, refreshToken);
        const { accessToken } = getTokensFromStorage();
        const getMyName = async (access: string) => {
            const url = import.meta.env.VITE_BASE_URL;
            const response = await fetch(`${url}/api/auth/users/me/`,{
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${access}`,
                },
            })
            const data = await response.json();
            setUser(data);
        }
        getMyName(accessToken);
        dispatch(setLoading(false));
    }, []);

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
                {user && <div className={styles.input_wrapper}>
                    <Controller
                        name="full_name"
                        control={control}
                        defaultValue={user.full_name || ''}
                        render={({ field }) => (
                            <input
                                {...field}
                                placeholder={t('modal-registration.user-name')}
                            />
                        )}
                    />
                    <div className={styles.errors}></div>
                    <Controller
                        name="phone"
                        control={control}
                        defaultValue={user.phone || ''}
                        render={({ field }) => (
                            <input
                                {...field}
                                placeholder={t('modal-registration.phone')}
                            />
                        )}
                    />
                    <div className={styles.errors}></div>
                </div>
                }
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
