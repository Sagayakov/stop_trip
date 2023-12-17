import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entities/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementTransportTypeOfTransport = ({ register }: Props) => {
    const { t } = useTranslation();

    const values = [
        { label: `${t('filters.ground')}`, value: 'ground' },
        { label: `${t('filters.water')}`, value: 'water' },
    ];
    return (
        <div className="ann-field">
            <h3>{t('filters.transport_type')}</h3>
            <UniversalRadioGroup
                name="transport_type"
                radioValues={values}
                register={register}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
