import styles from 'pages/mySettings/libr/mySettings.module.scss';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SettingTypes } from 'pages/mySettings/types/settingTypes.ts';

const MySettings = () => {
    const { t } = useTranslation();
    const { register, handleSubmit, reset } = useForm<SettingTypes>({
        mode: 'onBlur',
    });
    const onsubmit = (data: SettingTypes) => {
        console.log(data);
    };
    return (
        <section className={styles.my_setting}>
            <div className={styles.bread_crumbs}>
                <NavLink to="/">{t('category-page.main-link')}</NavLink>
                &nbsp;{` > ${t('my-settings.setting')}`}
            </div>
            <h1 className={styles.title}>{t('my-settings.setting')}</h1>
            <form
                className={styles.setting_form}
                onClick={handleSubmit(onsubmit)}
            >
                <div className={styles.input_wrapper}>
                    <input
                        {...register('full_name')}
                        placeholder={t('modal-registration.user-name')}
                    />
                    <div className={styles.errors}></div>
                    <input
                        {...register('phone')}
                        placeholder={t('modal-registration.phone')}
                    />
                    <div className={styles.errors}></div>
                </div>
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
