import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './libr/myAnnouncements.module.scss';
import { useGetAdvertsQuery } from 'app/api/fetchAdverts.ts';
import { MyAnnouncementCart } from 'features/myAnnouncements/MyAnnouncementCart.tsx';

export const MyAnnouncements = () => {
    const { t } = useTranslation();
    const { data } = useGetAdvertsQuery('');

    return (
        <>
            <div className={styles.bread_crumbs}>
                <NavLink to="/">{t('categoryPage-page.main-link')}</NavLink>
                &nbsp;{` > ${t('modal-logged.adverts')}`}
            </div>
            <h1 className={styles.title}>{t('modal-logged.adverts')}</h1>
            {data ? (
                <div className={styles.announcements_list}>
                    {data.results.map((el) => (
                        <MyAnnouncementCart
                            images={el.images}
                            price={el.price}
                            title={el.title}
                            date_create={el.date_create}
                        />
                    ))}
                </div>
            ) : (
                <h3 className={styles.noAnnouncements}>{t('myAnnouncements.noAnnouncements')}</h3>
            )}
        </>
    );
};
