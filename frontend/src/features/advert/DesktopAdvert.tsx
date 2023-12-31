import styles from 'widgets/advert/libr/advert.module.scss';
import { ProductInfo } from 'features/advert/ProductInfo.tsx';
import { PriceBlock } from 'entities/advert';
import { AdvertOwner } from 'entities/advert/advertOwner/AdvertOwner.tsx';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { Date } from 'widgets/advert/libr/types.ts';
import { useTranslation } from 'react-i18next';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { toast } from 'react-toastify';

interface Props {
    data: ProductType;
    date: Date | null;
}

export const DesktopAdvert = ({ data, date }: Props) => {
    const { t } = useTranslation();
    const { isTablet, isDesktop } = useMatchMedia();

    const handleClickShowNumber = () => {
        if (data) {
            toast.success(`${data.owner.phone}`);
        }
    };

    const handleClickWrite = () =>
        isTablet && toast.warn(`${t('main-page.messages-tooltip')}`);

    return (
        <>
            <h1 className={styles.announcement_header}>{data.title}</h1>
            <p>
                {data.city
                    ? `${data.country?.name || ''}, ${
                          data.region?.name || ''
                      }, ${data.city?.name || ''}`
                    : `${t('advert-page.no-address')}`}
            </p>
            <div className={styles.announcement_info}>
                <ProductInfo data={data} />
                <section className={styles.owner_info}>
                    <PriceBlock data={data} />
                    <AdvertOwner owner={data.owner} className={styles.owner} />
                    {isTablet ? (
                        <Link
                            className={styles.call_button}
                            to={`tel:${data.owner.phone}`}
                        >
                            {t('advert-page.call')}
                        </Link>
                    ) : (
                        <button
                            className={styles.call_button}
                            onClick={handleClickShowNumber}
                        >
                            {t('advert-page.show-number')}
                        </button>
                    )}
                    <button
                        className={styles.write_button}
                        data-tooltip-id="messages-tooltip"
                        data-tooltip-content={t('main-page.messages-tooltip')}
                        onClick={handleClickWrite}
                    >
                        {t('advert-page.write')}
                    </button>
                    {date && (
                        <p className={styles.public_date}>
                            {t('advert-page.published')}{' '}
                            <span>{`${date.dayToDisplay}, ${date.hours}:${date.minutes}`}</span>
                        </p>
                    )}
                </section>
            </div>
            {isDesktop && (
                <Tooltip
                    id="messages-tooltip"
                    variant="warning"
                    place="bottom"
                    opacity={1}
                    style={{ zIndex: '5', fontFamily: 'Inter' }}
                />
            )}
        </>
    );
};
