import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './libr/myAnnouncements.module.scss';
import { useMyAnnouncementsQuery } from 'app/api/fetchAdverts.ts';
import { MyAnnouncementCart } from 'features/myAnnouncements/MyAnnouncementCart.tsx';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';

const MyAnnouncements = () => {
    const { t } = useTranslation();
    const { accessToken } = getTokensFromStorage();
    const { data, isLoading, refetch } = useMyAnnouncementsQuery(accessToken);
    console.log(data);
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
                    {data?.map((el) => (
                        <MyAnnouncementCart key={el.id} {...el} refetch={refetch} />
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
