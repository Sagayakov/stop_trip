import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementExchangeRate = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="ann-field">
            <h3>{t('filters.exchange_rate')}:</h3>
            <input
                type="text"
                id="ann-field-price"
                placeholder={t('filters.exchange_rate')}
                {...register('exchange_rate', { required: true })}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
