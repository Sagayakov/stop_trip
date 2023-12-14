import { UseFormRegister } from 'react-hook-form';
import { TypeForExcursionFilter } from '../../../widgets/settingForm/settingExcursion/libr/TypeForExcursionFilter';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeForExcursionFilter>;
}

export const ExcursionTransfer = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="settingExcursion">
            <h3>{t('filters.transfer')}</h3>
            <label className="form-checkbox">
                <input type="checkbox" {...register('excursion_transfer')} />
                <span>{t('filters.transfer')}</span>
            </label>
        </div>
    );
};
