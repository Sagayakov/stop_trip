import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfPropertyForm } from '../../../../widgets/settingForm/settingRealty/libr/valuesOfPropertyForm';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementRealtyBalcony = ({ register }: Props) => {
    const optionValues = valuesOfPropertyForm.balcony;
    return (
        <div className="ann-field">
            <h3>Балкон</h3>
            <UniversalRadioGroup
                name="transportCondition"
                radioValues={optionValues}
                register={register}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
