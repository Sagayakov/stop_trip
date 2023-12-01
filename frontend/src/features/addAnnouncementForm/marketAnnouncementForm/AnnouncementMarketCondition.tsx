import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { conditionValues } from './libr/conditionValues';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementMarketCondition = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Состояние:</h3>
            <UniversalRadioGroup
                register={register}
                name="annoucementMarket"
                radioValues={conditionValues}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
