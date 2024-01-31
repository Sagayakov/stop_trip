import { UserMessenger } from 'pages/advertPage/libr/types.ts';
import { Link } from 'react-router-dom';
import styles from 'widgets/advert/libr/advert.module.scss';

type AdvertMessengersProps = {
    messengers: UserMessenger[];
};

export const AdvertMessengers = ({ messengers }: AdvertMessengersProps) => {
    return (
        <div className={styles.user_messengers}>
            {messengers.map((el) => (
                <Link
                    to={`https://${el.messenger.link_to_messenger}${el.link_to_user}`}
                    target="_blank"
                    key={el.messenger.id}
                >
                    <img src="../../../src/shared/ui/icons/tg.png" />
                </Link>
            ))}
        </div>
    );
};
