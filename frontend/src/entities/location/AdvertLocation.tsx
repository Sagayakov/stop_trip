import { ProductType } from '../../pages/advertPage/libr/types';
import './advertLocation.scss';
import { useMemo } from 'react';
import { MapComponent } from '../map/MapComponent';

type AdvertLocationProps = {
    data: ProductType;
};

export const AdvertLocation = ({ data }: AdvertLocationProps) => {
    const propertyLocation = useMemo(() => [
        Number(data.coordinates.split(',')[0]),
        Number(data.coordinates.split(',')[1]),
    ], [data.coordinates]);

    return (
        <div className="location">
            <div className="location-header">Расположение</div>
            <p>
                {data.property_city
                    ? `${data.property_city.name}, ${data.property_district ?? 'район не указан'}`
                    : 'Адрес не указан'}
            </p>
            <div className="map-wrapper">
                {propertyLocation && (
                    <MapComponent propertyLocation={propertyLocation} />
                )}
            </div>
        </div>
    );
};
