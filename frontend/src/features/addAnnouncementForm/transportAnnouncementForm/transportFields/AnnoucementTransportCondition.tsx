import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfTransportForm } from '../../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnoucementTransportCondition = ({ register }: Props) => {
    const conditionValue = valuesOfTransportForm.transport_condition;
    const { t } = useTranslation();

    return (
        <div className="ann-field">
            <h3>{t('filters.transport_condition')}</h3>
            <UniversalRadioGroup
                register={register}
                name="transport_condition"
                radioValues={conditionValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
