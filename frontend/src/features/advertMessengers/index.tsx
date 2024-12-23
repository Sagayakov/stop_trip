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
                    to={`https://${el.messenger.link_to_messenger}${el.link_to_user}${el.messenger.name === 'WhatsApp'
                        ? '?text=Здравствуйте!+Я+по+поводу+вашего+объявления+на+https://stoptrip.com/'
                        : ''}`}
                    target="_blank"
                    key={el.messenger.id}
                >
                    <img src={`/icons/icon${el.messenger.name}.png`} />
                </Link>
            ))}
        </div>
    );
};
