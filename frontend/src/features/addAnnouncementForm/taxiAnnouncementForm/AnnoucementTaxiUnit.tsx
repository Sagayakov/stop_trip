import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entities/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementTaxiUnit = ({ register }: Props) => {
    const { t } = useTranslation();

    const valuesOfTaxiUnit = [
        { label: 'Маршрут', value: 'route' },
        { label: 'Час', value: 'hour' },
        { label: 'Км', value: 'km' },
    ];

    return (
        <div className="ann-field">
            <h3>{t('filters.taxi_unit')}:</h3>
            <UniversalRadioGroup
                register={register}
                name="taxi_unit"
                radioValues={valuesOfTaxiUnit}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
