import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useEffect } from 'react';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    formState: FormState<FormAddAnn>;
    defaultValue?: string;
}

const AnnouncementCategoryField = ({
    control,
    setValue,
    formState,
    defaultValue,
}: Props) => {
    const { errors } = formState;
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');

    const getDefaultValue = () => {
        if (defaultValue) {
            return data?.category.find((el) => el.value === defaultValue);
        }
    };

    useEffect(() => {
        if (defaultValue) {
            setValue('category', getDefaultValue()!.value);
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, [defaultValue, getDefaultValue]);

    return (
        <>
            <div className={styles.ann_field}>
                <h2>
                    {t('labels.category')}
                    <span>*</span>:
                </h2>
                <UniversalSelectDropdown
                    closeMenuOnSelect={true}
                    control={control}
                    isMulti={false}
                    name="category"
                    options={data?.category.map((el) => ({
                        value: el.value,
                        label: t(`labels.${el.value}`),
                    }))}
                    placeholder={t('add-page.choose')}
                    prefix="filterAnnouncementCategory"
                    defaultValue={getDefaultValue()}
                    setValue={setValue}
                    requiredFiled={true}
                    isSearchable={!isMobile}
                />
                <div className={styles.ann_field_err}>
                    {errors?.category && `${t('add-page.choose-please')}`}
                </div>
            </div>
        </>
    );
};

export default AnnouncementCategoryField;
