import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementFoodDelivery = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="ann-field ann-food">
            <h3>{t('filters.food_delivery')}:</h3>
            <label className="form-checkbox">
                <input type="checkbox" {...register('food_delivery')} />
                <span>{t('filters.food_delivery')}</span>
            </label>
            <div className="ann-field-err"></div>
        </div>
    );
};
