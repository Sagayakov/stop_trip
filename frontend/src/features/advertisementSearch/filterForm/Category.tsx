import styles from 'widgets/settingForm/forms/filtersForm.module.scss';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { Control, UseFormSetValue } from 'react-hook-form';
import { SearchFormTypes } from 'pages/advertisementSearch/AdvertisementSearch.tsx';
import { categories } from 'shared/const/categories.tsx';
import { useTranslation } from 'react-i18next';

interface Props {
    control: Control<SearchFormTypes>;
    setValue: UseFormSetValue<SearchFormTypes>;
}

export const Category = ({ control, setValue }: Props) => {
    const { t } = useTranslation();
    const options = Object
        .entries(categories)
        .map(([key]) => ({
            value: key,
            label: t(`categories.${key}`),
        }),
    );

    return (
        <div className={styles.filter_realty_form}>
            <h3>{t('labels.category')}</h3>
            <UniversalSelectDropdown
                setValue={setValue}
                control={control}
                name="category"
                prefix="filterForm"
                placeholder={t('labels.category')}
                closeMenuOnSelect={true}
                isMulti={false}
                options={options}
            />
        </div>
    );
}