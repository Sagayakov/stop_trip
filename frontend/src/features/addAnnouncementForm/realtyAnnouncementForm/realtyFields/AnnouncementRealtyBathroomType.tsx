import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { UniversalRadioGroup } from '../../../../entities/universalDropdown/UniversalRadioGroup';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementRealtyBathroomType = ({ register }: Props) => {
    const { t } = useTranslation();

    const optionValues = [
        { label: `${t('filters.combined')}`, value: 'combined' },
        { label: `${t('filters.separate')}`, value: 'separate' },
    ];
    return (
        <div className="ann-field">
            <h3>{t('filters.property_bathroom_type')}</h3>
            <div className="radio-group">
                <UniversalRadioGroup
                    name="property_bathroom_type"
                    radioValues={optionValues}
                    register={register}
                />
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
