import { ProductType } from '../../pages/advertPage/libr/types';
import './advertLocation.scss';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type AdvertLocationProps = {
    data: ProductType;
};

export const AdvertLocation = ({ data }: AdvertLocationProps) => {
    const propertyLocation = [
        Number(data.property_coords.split(',')[0]),
        Number(data.property_coords.split(',')[1]),
    ];

    return (
        <div className="location">
            <div className="location-header">Расположение</div>
            <p>
                {data.property_city
                    ? `${data.property_city}, ${data.property_district ?? ''}`
                    : 'Адрес не указан'}
            </p>
            <div className="map-wrapper">
                {propertyLocation && (
                    <MapContainer
                        center={[
                            propertyLocation[0] || 15.49835602,
                            propertyLocation[1] || 73.85502627,
                        ]}
                        zoom={11}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            position={[
                                propertyLocation[0] || 15.49835602,
                                propertyLocation[1] || 73.85502627,
                            ]}
                        />
                    </MapContainer>
                )}
            </div>
        </div>
    );
};
