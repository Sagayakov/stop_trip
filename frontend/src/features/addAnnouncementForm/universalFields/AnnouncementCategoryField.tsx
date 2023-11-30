import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfCategory } from '../../../pages/addAnnouncement/libr/valuesOfCategory';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementCategoryField = ({
    control,
    setValue,
    formState,
}: Props) => {
    const { errors } = formState;

    return (
        <>
            <div className="ann-field">
                <h3>
                    Категория<span>*</span>:
                </h3>
                <UniversalSelectDropdown
                    closeMenuOnSelect={true}
                    control={control}
                    isMulti={false}
                    name="announcementCategory"
                    options={valuesOfCategory}
                    placeholder="Выберите категорию"
                    prefix="filterAnnouncementCategory"
                    setValue={setValue}
                    required={true}
                />
                <div className="ann-field-err">
                    {errors?.announcementCategory &&
                        'Пожалуйста, выберите категорию'}
                </div>
            </div>
        </>
    );
};
