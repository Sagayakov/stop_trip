import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown';
import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useEffect } from 'react';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    formState: FormState<FormAddAnn>;
    defaultValue?: string;
    // categoryList: SelectOption[] | undefined;
}

const AnnouncementCategoryField = ({ control, setValue, formState, defaultValue }: Props) => {
    const { errors } = formState;
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();

    const categoryList = [
        { label: `${t('labels.property')}`, value: 'property' },
        { label: `${t('labels.transport')}`, value: 'transport' },
        { label: `${t('labels.job')}`, value: 'job' },
        { label: `${t('labels.service')}`, value: 'service' },
        { label: `${t('labels.taxi')}`, value: 'taxi' },
        { label: `${t('labels.event')}`, value: 'event' },
        { label: `${t('labels.exchange_rate')}`, value: 'exchange_rate' },
        { label: `${t('labels.market')}`, value: 'market' },
        { label: `${t('labels.document')}`, value: 'document' },
        { label: `${t('labels.food')}`, value: 'food' },
        { label: `${t('labels.excursion')}`, value: 'excursion' },
    ];
    const getDefaultValue = () => {
        if(defaultValue){
            return categoryList.find((el) => el.value === defaultValue);
        }
    }

    useEffect(() => {
        if(defaultValue){
            setValue('category', getDefaultValue()!.value)
        }//если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, []);

    return (
        <>
            <div className={styles.ann_field}>
                <h3>
                    {t('labels.category')}
                    <span>*</span>:
                </h3>
                <UniversalSelectDropdown
                    closeMenuOnSelect={true}
                    control={control}
                    isMulti={false}
                    name="category"
                    options={categoryList}
                    placeholder={t('add-page.choose')}
                    prefix="filterAnnouncementCategory"
                    defaultValue={getDefaultValue()}
                    setValue={setValue}
                    required={true}
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
