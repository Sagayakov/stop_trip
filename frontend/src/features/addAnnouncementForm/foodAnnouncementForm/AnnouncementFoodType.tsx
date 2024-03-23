import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { StringOptions } from 'app/api/types/selectOptionValues.ts';
import { useAppSelector } from 'app/store/hooks';
import { FormState } from 'react-hook-form';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementFoodType = ({
    setValue,
    control,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');
    const lang = useAppSelector((state) => state.setLang.lang);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.food_type')}:</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="food_type"
                options={
                    lang === 'ru'
                        ? data?.food_type
                        : data?.food_type.map((el) => ({
                              value: el.value,
                              label: `${el.value[0].toUpperCase()}${el.value.slice(
                                  1
                              )}`,
                          }))
                }
                defaultValue={
                    getDefaultValue(
                        defaultValue,
                        data?.food_type
                    ) as StringOptions
                }
                placeholder={t('filters.food_type')}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
                isSearchable={false}
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.food_type?.message}
            </div>
        </div>
    );
};
