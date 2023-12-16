import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entities/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementTransportTypeOfService = ({ register }: Props) => {
    const { t } = useTranslation();

    const radioValues = [
        { label: `${t('filters.rent')}`, value: 'rent' },
        { label: `${t('filters.sale')}`, value: 'sale' },
    ];

    return (
        <div className="ann-field">
            <h3>{t('filters.transport_type_of_service')}</h3>
            <UniversalRadioGroup
                register={register}
                name="transport_type_of_service"
                radioValues={radioValues}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
