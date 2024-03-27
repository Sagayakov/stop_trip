import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useGetRegionsByCountryQuery } from 'app/api/fetchAdverts';
import { useEffect, useState } from 'react';
import { NameType } from 'pages/advertPage/libr/types';
//import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: NameType | null;
    formState: FormState<FormAddAnn>;
}

type SelectType = {
    value: string;
    label: string;
};

const AnnouncementRegion = ({
    control,
    setValue,
    formState,
    defaultValue,
}: Props) => {
    const { t } = useTranslation();
    const [options, setOptions] = useState<SelectType[]>([]);
    //const lang = useAppSelector((state) => state.setLang.lang);
    const { data } = useGetRegionsByCountryQuery('?country=india');
    const [defaultRegion, setDefaultRegion] = useState<SelectType>({
        value: 'north-goa',
        label: 'Северный Гоа',
    });

    useEffect(() => {
        if (data) {
            setOptions(data.map((el) => ({ value: el.slug, label: el.name })));
            if (defaultValue) {
                const defRegion = data.find(
                    (el) => el.slug === defaultValue.slug
                );
                setValue('region', defRegion?.slug);
                setDefaultRegion({
                    value: defRegion?.slug || '',
                    label: defRegion?.name || '',
                });
            }
        }
    }, [data, defaultValue, setValue]);

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('add-page.region')}
                <span>*</span>:
            </h3>
            <UniversalSelectDropdown<FormAddAnn>
                setValue={setValue}
                control={control}
                name="region"
                prefix="filterAnnouncementCategory"
                placeholder={t('add-page.region')}
                closeMenuOnSelect={true}
                isMulti={false}
                isDisabled={false}
                options={
                    /* lang === 'ru'
                        ? */ options
                    /* : options.map((el) => ({
                              value: el.value,
                              label: `${el.value[0].toUpperCase()}${el.value.slice(
                                  1
                              )}`,
                          })) */
                }
                defaultValue={defaultRegion}
                //requiredFiled={true}
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.region?.message}
            </div>
        </div>
    );
};
export default AnnouncementRegion;
