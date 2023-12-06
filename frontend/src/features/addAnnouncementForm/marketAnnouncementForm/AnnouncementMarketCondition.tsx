import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementMarketCondition = ({ register }: Props) => {
    const conditionValues = [{label: 'Б/у', value: 'Б/у'}, {label: 'Новое', value: 'Новое'}]
    return (
        <div className="ann-field">
            <h3>Состояние:</h3>
            <UniversalRadioGroup
                register={register}
                name="market_condition"
                radioValues={conditionValues}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
