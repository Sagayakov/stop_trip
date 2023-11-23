import { ProductType } from '../../pages/advertPage/libr/types';
import './advertLocation.scss';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type AdvertLocationProps = {
    data: ProductType;
};

export const AdvertLocation = ({ data }: AdvertLocationProps) => {
    const propertyLocation = [
        Number(data.coordinates.split(',')[0]),
        Number(data.coordinates.split(',')[1]),
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
                            propertyLocation[0],
                            propertyLocation[1],
                        ]}
                        zoom={11}
                        scrollWheelZoom={true}
                        zoomControl
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            position={[
                                propertyLocation[0],
                                propertyLocation[1],
                            ]}
                        >
                            <Popup>
                                {data.property_city
                                    ? `${data.property_city}, ${
                                          data.property_district ?? ''
                                      }`
                                    : `${propertyLocation[0]},
                                    ${propertyLocation[1]}`}
                            </Popup>
                        </Marker>
                    </MapContainer>
                )}
            </div>
        </div>
    );
};
