import { ProductType } from 'pages/advertPage/libr/types.ts';
import styles from './advertLocation.module.scss';
import { useMemo } from 'react';
import { MapComponent } from '../map/MapComponent';
import { useTranslation } from 'react-i18next';

type AdvertLocationProps = {
    data: ProductType;
};

export const AdvertLocation = ({ data }: AdvertLocationProps) => {
    const propertyLocation = useMemo(
        () => [
            Number(data.coordinates.split(',')[0]),
            Number(data.coordinates.split(',')[1]),
        ],
        [data.coordinates]
    );
    const { t } = useTranslation();

    return (
        <div className={styles.location}>
            <div className={styles.location_header}>
                {t('advert-page.location')}
            </div>
            <p>
                {data.city
                    ? `${data.country?.name || ''}, ${
                          data.region?.name || ''
                      }, ${data.city?.name || ''}`
                    : `${t('advert-page.no-address')}`}
            </p>
            <div className={styles.map_wrapper}>
                {propertyLocation && (
                    <MapComponent propertyLocation={propertyLocation} />
                )}
            </div>
        </div>
    );
};
