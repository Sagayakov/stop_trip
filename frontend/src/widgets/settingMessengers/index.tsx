import { useTranslation } from 'react-i18next';
import styles from './libr/settingMessengers.module.scss';
import { AddMessengerForm } from 'entity/addMessengerForm';
import {
    useGetMessengersQuery,
    useGetUserMessengersQuery,
} from 'app/api/fetchMessengers';

export const SettingMessengers = () => {
    const { t } = useTranslation();
    const { data: allMessengersData } = useGetMessengersQuery('');
    const { data: userMessengersData } = useGetUserMessengersQuery('');

    return (
        <section className={styles.messengers_wrapper}>
            <p className={styles.messengers_header}>
                {t('my-settings.user-messengers')}
            </p>
            {userMessengersData && userMessengersData.results.length && (
                <div className={styles.current_messengers}>
                    <span></span>
                </div>
            )}
            {allMessengersData && userMessengersData && (
                <div className={styles.add_messengers_block}>
                    <AddMessengerForm
                        messengers={userMessengersData.results}
                        allMessengers={allMessengersData}
                    />
                </div>
            )}
        </section>
    );
};
