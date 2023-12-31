import { Control, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown.tsx';
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
}

export const AnnouncementDocType = ({
    setValue,
    control,
    defaultValue,
}: Props) => {
    const { t } = useTranslation();
    const options = [
        { value: 'tourist-visa', label: 'Туристическая виза' },
        { value: 'business-visa', label: 'Бизнес-виза' },
        { value: 'c-form', label: 'C-форма' },
        { value: 'exit-permit', label: 'Продление выезда' },
        { value: 'other', label: 'Другое' },
    ];

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.document_type')}:</h3>
            <UniversalSelectDropdown
                setValue={setValue}
                control={control}
                name="document_type"
                prefix="filterAnnouncementCategory"
                placeholder={t('filters.document_type')}
                closeMenuOnSelect={true}
                isMulti={false}
                options={options}
                defaultValue={getDefaultValue(defaultValue, options)}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
