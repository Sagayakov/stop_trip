import { BreadCrumbs } from 'widgets/breadCrumbs/BreadCrumbs.tsx';
import styles from './libr/advert.module.scss';
import { useGetAdvertBySlugQuery } from 'app/api/fetchAdverts.ts';
import { useParams } from 'react-router-dom';
import { getDate } from 'shared/utils/getDate.ts';
import { useEffect, useState } from 'react';
import { Date } from './libr/types.ts';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { DesktopAdvert } from 'features/advert/DesktopAdvert.tsx';
import { MobileAdvert } from 'features/advert/MobileAdvert.tsx';

const Advert = () => {
    const { slug } = useParams();
    const { data } = useGetAdvertBySlugQuery(slug!);
    const [date, setDate] = useState<Date | null>(null);
    const { isMobile } = useMatchMedia();

    useEffect(() => {
        if (data) {
            const dateCreate = getDate(data.date_create);
            setDate(dateCreate);
        }
    }, [data]);

    return (
        <>
            {data && (
                <div className={styles.announcement_wrapper}>
                    <BreadCrumbs data={data} />
                    {!isMobile ? (
                        <DesktopAdvert data={data} date={date} />
                    ) : (
                        <MobileAdvert data={data} date={date} />
                    )}
                </div>
            )}
        </>
    );
};

export default Advert;
