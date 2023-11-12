import { ProductType } from '../../pages/advertPage/libr/types';
import './advertLocation.scss';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type AdvertLocationProps = {
    data: ProductType;
};

export const AdvertLocation = ({ data }: AdvertLocationProps) => {
    const propertyLocation = [
        Number(data.property_coords.split(',')[0]),
        Number(data.property_coords.split(',')[1]),
    ];

    const goaLat = 15.49835602;
    const goaLng = 73.85502627;

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
                            propertyLocation[0] || goaLat,
                            propertyLocation[1] || goaLng,
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
                                propertyLocation[0] || goaLat,
                                propertyLocation[1] || goaLng,
                            ]}
                        >
                            <Popup>
                                {data.property_city
                                    ? `${data.property_city}, ${
                                          data.property_district ?? ''
                                      }`
                                    : 'Индия, Гоа'}
                            </Popup>
                        </Marker>
                    </MapContainer>
                )}
            </div>
        </div>
    );
};
