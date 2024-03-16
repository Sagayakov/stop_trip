//import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { MapComponent } from 'entity/map/MapComponent.tsx';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

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
    const { t } = useTranslation();

    /* useEffect(() => {
        if (markerPosition) {
            const arr = markerPosition?.split(',');
            const latitude = arr[0];
            const longitude = arr[1];
            setValue('coordinates', `${latitude}, ${longitude}`);
        }
    }, [markerPosition, setValue]); */

    const defaultCoordinates = () => {
        if (markerPosition) {
            const arr = markerPosition?.split(',');
            const latitude = Number(arr[1]);
            const longitude = Number(arr[0]);
            return [latitude, longitude];
        }
    };

    return (
        <div className={styles.ann_field}>
            <h3>{`${t('add-page.location')}:`}</h3>
            <div className={styles.map_wrapper}>
                <MapComponent
                    propertyLocation={
                        defaultCoordinates() || [73.821235, 15.483506]
                    }
                    isSelected={true}
                    setMarkerPosition={setMarkerPosition}
                    setValue={setValue}
                />
            </div>
            <div className={styles.ann_field_err}></div>
        </div>
    );
};

export default AnnouncementLocationField;
