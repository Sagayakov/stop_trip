import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown.tsx';
import { Control, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useEffect } from 'react';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: { name: string; } | null
}

const AnnouncementRegion = ({ control, setValue }: Props) => {
    const { t } = useTranslation();
    const options = [{ value: 'goa', label: 'Гоа' }];

    useEffect(() => {
        setValue('region', "goa");
    }, []);

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('add-page.region')}
                <span>*</span>:
            </h3>
            <UniversalSelectDropdown<FormAddAnn>
                setValue={setValue}
                control={control}
                name="region"
                prefix="filterAnnouncementCategory"
                placeholder={t('add-page.region')}
                closeMenuOnSelect={true}
                isMulti={false}
                options={options}
                defaultValue={options[0]}
                // defaultValue={options.find((el) => el.label === defaultValue?.name)}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
export default AnnouncementRegion;
