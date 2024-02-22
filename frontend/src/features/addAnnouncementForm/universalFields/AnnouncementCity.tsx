import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { useEffect } from 'react';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: { name: string } | null | undefined;
    formState: FormState<FormAddAnn>;
}

const AnnouncementCity = ({ control, setValue, defaultValue, formState }: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');

    useEffect(() => {
        if (defaultValue) {
            const defaultCity = data?.city.find(
                (el) => el.label === defaultValue.name
            );
            setValue('city', defaultCity!.value);
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, [defaultValue]);

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('add-page.city')}
                <span>*</span>:
            </h3>
            <UniversalSelectDropdown<FormAddAnn>
                setValue={setValue}
                control={control}
                name="city"
                prefix="filterAnnouncementCategory"
                placeholder={t('add-page.city')}
                closeMenuOnSelect={true}
                isMulti={false}
                options={data?.city}
                requiredFiled={true}
                defaultValue={data?.city.find(
                    (el) => el.label === defaultValue?.name
                )}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.city?.message}</div>
        </div>
    );
};
export default AnnouncementCity;
