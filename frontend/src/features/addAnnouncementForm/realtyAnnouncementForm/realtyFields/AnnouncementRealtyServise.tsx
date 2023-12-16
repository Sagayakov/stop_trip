import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entities/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementRealtyServise = ({ register }: Props) => {
    const { t } = useTranslation();

    const radioValues = [
        { label: `${t('filters.sale')}`, value: 'sale' },
        { label: `${t('filters.rent')}`, value: 'rent' },
    ];

    return (
        <div className="ann-field">
            <h3>{t('filters.property_type_of_service')}</h3>
            <UniversalRadioGroup
                name="property_type_of_service"
                radioValues={radioValues}
                register={register}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
