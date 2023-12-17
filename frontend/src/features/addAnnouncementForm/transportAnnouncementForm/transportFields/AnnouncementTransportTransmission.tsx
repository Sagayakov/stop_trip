import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entities/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { valuesOfTransportForm } from 'widgets/settingForm/settingTransport/libr/valuesOfTransportForm.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementTransportTransmission = ({ register }: Props) => {
    const transmissionValues =
        valuesOfTransportForm.transport_transmission_type;
    const { t } = useTranslation();

    return (
        <div className="ann-field">
            <h3>{t('filters.transport_transmission_type')}</h3>
            <UniversalRadioGroup
                register={register}
                name="transport_transmission_type"
                radioValues={transmissionValues}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
