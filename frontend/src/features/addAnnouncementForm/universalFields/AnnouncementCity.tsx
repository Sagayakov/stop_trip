import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown.tsx';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { Control, UseFormSetValue } from 'react-hook-form';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: {name: string} | null | undefined
}

const AnnouncementCity = ({ control, setValue, defaultValue }: Props) => {
    const { t } = useTranslation();
    const options = [
        { value: 'arambol', label: 'Арамболь' },
        { value: 'panzhim', label: 'Панжим' },
    ];

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('add-page.city')}
                <span>*</span>:
            </h3>
            <UniversalSelectDropdown<FormAddAnn>
                setValue={setValue}
                control={control}
                name="city.name"
                prefix="filterAnnouncementCategory"
                placeholder={t('add-page.city')}
                closeMenuOnSelect={true}
                isMulti={false}
                options={options}
                defaultValue={options.find((el) => el.label === defaultValue?.name)}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
export default AnnouncementCity;
