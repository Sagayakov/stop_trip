import { ProductType } from '../../pages/advertPage/libr/types';
import './advertLocation.scss';
import GoogleMapReact from 'google-map-react';
import { Map } from './Map';
import { useEffect, useState } from 'react';

type AdvertLocationProps = {
    data: ProductType;
};

export const AdvertLocation = ({ data }: AdvertLocationProps) => {
    const [userLocation, setUserLocation] =
        useState<GoogleMapReact.Coords | null>(null);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude: lat, longitude: lng } = position.coords;
                    setUserLocation({ lat, lng });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    const defaultProps = {
        center: {
            lat: 15.49835602,
            lng: 73.85502627,
        },
        zoom: 10,
    };

    return (
        <div className="location">
            <div className="location-header">Расположение</div>
            <p>
                {data.property_city
                    ? `${data.property_city}, ${data.property_district ?? ''}`
                    : 'Адрес не указан'}
            </p>
            <div className="map-wrapper">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: '' }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    {userLocation && (
                        <Map
                            lat={userLocation.lat}
                            lng={userLocation.lng}
                            text="My Marker"
                        />
                    )}
                </GoogleMapReact>
            </div>
        </div>
    );
};
