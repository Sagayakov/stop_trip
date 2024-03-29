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

export const AnnouncementExchangeFor = ({
    setValue,
    control,
    defaultValue,
    formState,
    watch,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');
    const proposed = watch('proposed_currency');
    const lang = useAppSelector((state) => state.setLang.lang);

    const getDefaultValue = () => {
        if (defaultValue) {
            return data?.exchange_for.find((el) => el.value === defaultValue);
        }
    };

    useEffect(() => {
        if (defaultValue) {
            setValue('exchange_for', getDefaultValue()!.value);
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, [defaultValue]);

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('filters.exchange_for')}
                <span>*</span>:
            </h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="exchange_for"
                options={
                    lang === 'ru'
                        ? data?.exchange_for.filter(
                              (el) => el.value !== proposed
                          )
                        : data?.exchange_for
                              .filter((el) => el.value !== proposed)
                              .map((el) => ({
                                  value: el.value,
                                  label: el.value,
                              }))
                }
                defaultValue={getDefaultValue()}
                placeholder={t('filters.exchange_for')}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
                requiredFiled={true}
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.exchange_for?.message}
            </div>
        </div>
    );
};
