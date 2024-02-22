import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './libr/myAnnouncements.module.scss';
import { MyAnnouncementCart } from 'features/myAnnouncements/MyAnnouncementCart.tsx';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';
import { useMyAnnouncementsQuery } from 'app/api/authFetchAdverts.ts';

const MyAnnouncements = () => {
    const { t } = useTranslation();
    const { data, isLoading, refetch } = useMyAnnouncementsQuery('');

    return (
        <>
            {isLoading && <LoadingWithBackground />}
            <div className={styles.bread_crumbs}>
                <NavLink to="/">{t('category-page.main-link')}</NavLink>
                &nbsp;{` > ${t('modal-logged.adverts')}`}
            </div>
            <h1 className={styles.title}>{t('modal-logged.adverts')}</h1>
            {data ? (
                <div className={styles.announcements_list}>
                    {data?.map((el, index: number) => (
                        <MyAnnouncementCart key={el.id} {...el} refetch={refetch} index={index} />
                    ))}
                </div>
            ) : (
                !isLoading && (
                    <h3 className={styles.noAnnouncements}>
                        {t('myAnnouncements.noAnnouncements')}
                    </h3>
                )
            )}
        </>
    );
};

export default MyAnnouncements;
