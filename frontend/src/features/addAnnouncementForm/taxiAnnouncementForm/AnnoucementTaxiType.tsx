import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { taxiValues } from './taxiValues';
import { useTranslation } from 'react-i18next';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}
export const AnnouncementTaxiType = ({ control, setValue }: Props) => {
    const valuesOfTaxiType = taxiValues.valuesofTaxiType;
    const { t } = useTranslation();

    return (
        <div className="ann-field">
            <h3>{t('filters.taxi_type')}:</h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="taxi_type"
                placeholder={t('filters.taxi_type')}
                options={valuesOfTaxiType}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
