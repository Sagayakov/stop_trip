import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useEffect } from 'react';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementExchangeName = ({
    setValue,
    control,
    defaultValue,
    formState
}: Props) => {
    const { t } = useTranslation();

    const exchangeNameValues = [
        { label: 'Доллар', value: 'USD' },
        { label: 'Рубль', value: 'RUB' },
        { label: 'Рупий', value: 'Рупий' },
        { label: 'Евро', value: 'EUR' },
    ];
    const getDefaultValue = () => {
        if (defaultValue) {
            return exchangeNameValues.find((el) => el.value === defaultValue);
        }
    };

    useEffect(() => {
        if (defaultValue) {
            setValue('proposed_currency', getDefaultValue()!.value);
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, []);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.proposed_currency')}<span>*</span>:</h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="proposed_currency"
                options={exchangeNameValues}
                placeholder={t('filters.proposed_currency')}
                defaultValue={getDefaultValue()}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
                requiredFiled={true}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.proposed_currency?.message}</div>
        </div>
    );
};
