import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { UniversalRadioGroup } from '../../../../entities/universalDropdown/UniversalRadioGroup';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementRealtyBathroomType = ({ register }: Props) => {
    const optionValues = [{label: 'Совмещенный', value: 'Совмещенный'}, {label: 'Раздельный', value: 'Раздельный'}]
    return (
        <div className="ann-field">
            <h3>Санузел</h3>
            <div className="radio-group">
                <UniversalRadioGroup name='property_bathroom_type' radioValues={optionValues} register={register} />
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
