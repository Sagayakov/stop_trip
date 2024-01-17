import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
}

export const AnnouncementTransportModelOfTransport = ({
    setValue,
    control,
    defaultValue,
}: Props) => {
    const { t } = useTranslation();

    const optionValues = [
        {value: '3', label: '3'},
        {value: 'land-cruizer', label: 'Land Cruizer'},
        {value: 'tdm-850', label: 'TDM-850'},
    ];

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_model')}</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="transport_model"
                options={optionValues}
                placeholder={t('filters.choose-model')}
                defaultValue={getDefaultValue(defaultValue, optionValues)}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
