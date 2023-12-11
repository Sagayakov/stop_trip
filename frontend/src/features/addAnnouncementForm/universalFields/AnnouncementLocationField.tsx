import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { MapComponent } from '../../../entities/map/MapComponent';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    markerPosition: string | undefined;
    setMarkerPosition: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AnnouncementLocationField = ({
    setValue,
    markerPosition,
    setMarkerPosition,
}: Props) => {
    /* const initialPosition: LatLng = new LatLng(15.2993, 74.124);
    const zoom = 10; */

    /* const handleMapClick = (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition(String(lat) + ", " + lng);
    }; */
    /* const position = {
        lat: Number(markerPosition?.split(',')[0]),
        lng: Number(markerPosition?.split(',')[1])
    } */
    /* const MapClickHandler = () => {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    }; */

    useEffect(() => {
        markerPosition &&
            setValue('coordinates', markerPosition);
    }, [markerPosition]);

    return (
        <div className="ann-field">
            <h3>
                Локация:
                {/* Локация<span>*</span>: */}
            </h3>
            <div className="map-wrapper">
                <MapComponent
                    propertyLocation={[15.2993, 54.124]}
                    isSelected={true}
                    setMarkerPosition={setMarkerPosition}
                />
            </div>
            {/* <MapContainer
                center={initialPosition}
                zoom={zoom}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler />
                {markerPosition && (
                    <Marker position={[position.lat, position.lng]}>
                        <Popup>
                            Координаты: {position.lat.toFixed(6)},{' '}
                            {position.lng.toFixed(6)}
                        </Popup>
                    </Marker>
                )}
            </MapContainer> */}
            <div className="ann-field-err"></div>
        </div>
    );
};

export default AnnouncementLocationField;