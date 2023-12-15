import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementRealtyBalcony = ({ register }: Props) => {
    const { t } = useTranslation();

    const optionValues = [
        { label: `${t('filters.loggia')}`, value: 'loggia' },
        { label: `${t('filters.no')}`, value: 'no' },
        { label: `${t('filters.yes')}`, value: 'yes' },
    ];
    return (
        <div className="ann-field">
            <h3>{t('filters.property_balcony')}</h3>
            <UniversalRadioGroup
                name="property_balcony"
                radioValues={optionValues}
                register={register}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
