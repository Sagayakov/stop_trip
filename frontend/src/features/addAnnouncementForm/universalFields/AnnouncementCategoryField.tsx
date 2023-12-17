import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown';
import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import {
    FormAddAnn /* SelectOption, */,
} from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    formState: FormState<FormAddAnn>;
    // categoryList: SelectOption[] | undefined;
}

const AnnouncementCategoryField = ({ control, setValue, formState }: Props) => {
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

    return (
        <>
            <div className="ann-field">
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
                    setValue={setValue}
                    required={true}
                    isSearchable={!isMobile}
                />
                <div className="ann-field-err">
                    {errors?.category && `${t('add-page.choose-please')}`}
                </div>
            </div>
        </>
    );
};

export default AnnouncementCategoryField;
