import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { MapComponent } from 'entities/map/MapComponent.tsx';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

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

    useEffect(() => {
        markerPosition && setValue('coordinates', markerPosition);
    }, [markerPosition]);

    return (
        <div className={styles.ann_field}>
            <h3>
                {`${t('add-page.location')}:`}
            </h3>
            <div className={styles.map_wrapper}>
                <MapComponent
                    propertyLocation={[15.2993, 54.124]}
                    isSelected={true}
                    setMarkerPosition={setMarkerPosition}
                />
            </div>
            <div className={styles.ann_field_err}></div>
        </div>
    );
};

export default AnnouncementLocationField;
