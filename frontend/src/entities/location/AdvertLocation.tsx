import { ProductType } from '../../pages/advertPage/libr/types';
import './advertLocation.scss';
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
        <div className="location">
            <div className="location-header">{t('advert-page.location')}</div>
            <p>
                {data.property_city
                    ? `${data.property_city.name}, ${
                          data.property_district ??
                          `${t('advert-page.no-district')}`
                      }`
                    : `${t('advert-page.no-address')}`}
            </p>
            <div className="map-wrapper">
                {propertyLocation && (
                    <MapComponent propertyLocation={propertyLocation} />
                )}
            </div>
        </div>
    );
};
