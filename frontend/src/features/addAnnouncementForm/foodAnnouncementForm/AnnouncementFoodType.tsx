import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementFoodType = ({ setValue, control }: Props) => {
    const options = [
        { label: 'Вегитарианская еда', value: 'Вегитарианская еда' },
        { label: 'Не вегетарианская еда', value: 'Не вегетарианская еда' },
        { label: 'Готовая еда', value: 'Готовая еда' },
        { label: 'Полуфабрикаты', value: 'Полуфабрикаты' },
        { label: 'Другое', value: 'Другое' },
    ];

    return (
        <div className="ann-field">
            <h3>Тип еды:</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="food_type"
                options={options}
                placeholder="Тип еды"
                prefix="filterAnnouncementCategory"
                setValue={setValue}
                isSearchable={false}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
