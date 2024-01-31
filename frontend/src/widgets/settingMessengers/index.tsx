import { useTranslation } from 'react-i18next';
import styles from './libr/settingMessengers.module.scss';
import { AddMessengerForm } from 'entity/addMessengerForm';
//import { useGetMessengersQuery } from 'app/api/fetchMessengers';

export const SettingMessengers = () => {
    const { t } = useTranslation();
    //const { data } = useGetMessengersQuery('');

    return (
        <section className={styles.messengers_wrapper}>
            <p className={styles.messengers_header}>
                {t('my-settings.user-messengers')}
            </p>
            {/* {data && data.results.length && (
                <div className={styles.current_messengers}>
                    <span></span>
                </div>
            )} */}
            <div className={styles.add_messengers_block}>
                <AddMessengerForm />
            </div>
        </section>
    );
};
