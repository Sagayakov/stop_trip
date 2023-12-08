import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn, /* SelectOption, */  } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { useMatchMedia } from '../../../app/hooks/useMatchMedia';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    formState: FormState<FormAddAnn>;
    // categoryList: SelectOption[] | undefined;
}

const AnnouncementCategoryField = ({
    control,
    setValue,
    formState,
}: Props) => {
    const { errors } = formState;
    const { isMobile } = useMatchMedia()
    const categoryList = [
        { label: 'Недвижимость', value: 'property' },
        { label: 'Транспорт', value: 'transport' },
        { label: 'Работа', value: 'job' },
        { label: 'Услуги', value: 'service' },
        { label: 'Такси', value: 'taxi' },
        { label: 'События', value: 'event' },
        { label: 'Обмен валюты', value: 'exchange_rate' },
        { label: 'Купля/продажа', value: 'market' },
        { label: 'Документы', value: 'document' },
        { label: 'Еда', value: 'food' },
        { label: 'Экскурсии', value: 'excursion' },
    ];
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
                    name="category"
                    options={categoryList}
                    placeholder="Выберите категорию"
                    prefix="filterAnnouncementCategory"
                    setValue={setValue}
                    required={true}
                    isSearchable={!isMobile}
                />
                <div className="ann-field-err">
                    {errors?.category && 'Пожалуйста, выберите категорию'}
                </div>
            </div>
        </>
    );
};

export default AnnouncementCategoryField;