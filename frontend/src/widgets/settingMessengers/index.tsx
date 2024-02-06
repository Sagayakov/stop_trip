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
                    {userMessengersData.results.map((el) => (
                        <span key={el.id} className={styles.user_messenger}>
                            <img
                                src={`../../../src/shared/ui/icons/icon${el.messenger.name}.png`}
                                alt={el.messenger.name}
                            />
                            {`${el.messenger.link_to_messenger}${el.link_to_user}`}
                        </span>
                    ))}
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
