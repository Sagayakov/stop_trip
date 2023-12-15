import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementTransportYear = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="ann-field">
            <h3>{t('filters.transport_year_of_production')}</h3>
            <div className="inputNumber-group">
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    min={1970}
                    placeholder={t('filters.year')}
                    {...register('transport_year_of_production')}
                />
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
