import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementFoodType = ({ setValue, control }: Props) => {
    const { t } = useTranslation();

    const options = [
        { label: 'Вегетарианская еда', value: 'veg_food' },
        { label: 'Невегетарианская еда', value: 'non_veg_food' },
        { label: 'Готовая еда', value: 'ready_food' },
        { label: 'Полуфабрикаты', value: 'semi_finished_food' },
        { label: 'Другое', value: 'other_food' },
    ];

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.food_type')}:</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="food_type"
                options={options}
                placeholder={t('filters.food_type')}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
                isSearchable={false}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
