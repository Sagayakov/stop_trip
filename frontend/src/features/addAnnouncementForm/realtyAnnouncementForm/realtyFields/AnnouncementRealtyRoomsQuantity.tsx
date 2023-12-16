import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entities/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementRealtyRoomsQuantity = ({ register }: Props) => {
    const { t } = useTranslation();

    const optionValues = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
    ];
    return (
        <div className="ann-field">
            <h3>{t('filters.property_rooms_count')}</h3>
            <div className="radio-group">
                <UniversalRadioGroup
                    radioValues={optionValues}
                    name="property_rooms_count"
                    register={register}
                />
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
