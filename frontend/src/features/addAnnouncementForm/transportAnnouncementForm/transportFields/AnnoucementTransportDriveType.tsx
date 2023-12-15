import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfTransportForm } from '../../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnoucementTransportDriveType = ({ register }: Props) => {
    const { t } = useTranslation();

    const driveValue = valuesOfTransportForm.transport_drive_type;

    return (
        <div className="ann-field">
            <h3>{t('filters.transport_drive_type')}</h3>
            <UniversalRadioGroup
                register={register}
                name="transport_drive_type"
                radioValues={driveValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
