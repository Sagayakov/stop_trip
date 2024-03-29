import {
    Control,
    FormState,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useEffect } from 'react';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
    watch: UseFormWatch<FormAddAnn>;
}

export const AnnouncementExchangeName = ({
    setValue,
    control,
    defaultValue,
    formState,
    watch,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');
    const exchangeFor = watch('exchange_for');
    const lang = useAppSelector((state) => state.setLang.lang);

    const getDefaultValue = () => {
        if (defaultValue) {
            return data?.proposed_currency.find(
                (el) => el.value === defaultValue
            );
        }
    };

    useEffect(() => {
        if (defaultValue) {
            setValue('proposed_currency', getDefaultValue()!.value);
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, []);

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('filters.proposed_currency')}
                <span>*</span>:
            </h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="proposed_currency"
                options={
                    lang === 'ru'
                        ? data?.proposed_currency.filter(
                              (el) => el.value !== exchangeFor
                          )
                        : data?.proposed_currency
                              .filter((el) => el.value !== exchangeFor)
                              .map((el) => ({
                                  value: el.value,
                                  label: el.value,
                              }))
                }
                placeholder={t('filters.proposed_currency')}
                defaultValue={getDefaultValue()}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
                requiredFiled={true}
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.proposed_currency?.message}
            </div>
        </div>
    );
};
