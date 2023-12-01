import { LatLng, LeafletMouseEvent } from 'leaflet';
import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from 'react-leaflet';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    markerPosition: LatLng | undefined;
    setMarkerPosition: React.Dispatch<React.SetStateAction<LatLng | undefined>>;
}

export const AnnouncementLocationField = ({
    setValue,
    markerPosition,
    setMarkerPosition,
}: Props) => {
    const initialPosition: LatLng = new LatLng(15.2993, 74.124);
    const zoom = 10;

    const handleMapClick = (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition(new LatLng(lat, lng));
    };

    const MapClickHandler = () => {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    };

    useEffect(() => {
        markerPosition &&
            setValue('announcementLocation.latitude', markerPosition.lat);
        markerPosition &&
            setValue('announcementLocation.longitude', markerPosition.lng);
    }, [markerPosition]);

    return (
        <div className="ann-field">
            <h3>
                Локация:
                {/* Локация<span>*</span>: */}
            </h3>
            <MapContainer
                center={initialPosition}
                zoom={zoom}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler />
                {markerPosition && (
                    <Marker position={[markerPosition.lat, markerPosition.lng]}>
                        <Popup>
                            Координаты: {markerPosition.lat.toFixed(6)},{' '}
                            {markerPosition.lng.toFixed(6)}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
            <div className="ann-field-err"></div>
        </div>
    );
};
