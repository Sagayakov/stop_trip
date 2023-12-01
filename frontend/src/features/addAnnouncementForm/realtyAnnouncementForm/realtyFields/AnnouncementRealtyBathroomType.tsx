import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfPropertyForm } from '../../../../widgets/settingForm/settingRealty/libr/valuesOfPropertyForm';
import { UniversalRadioGroup } from '../../../../entities/universalDropdown/UniversalRadioGroup';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementRealtyBathroomType = ({ register }: Props) => {
    const optionValues = valuesOfPropertyForm.bathroomType
    return (
        <div className="ann-field">
            <h3>Санузел</h3>
            <div className="radio-group">
                <UniversalRadioGroup name='BathRoom' radioValues={optionValues} register={register} />
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
