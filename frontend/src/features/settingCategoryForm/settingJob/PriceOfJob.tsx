import { UseFormRegister } from 'react-hook-form';
import { TypesOfJobs } from 'widgets/settingForm/settingJob/libr/TypesOfJobs.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypesOfJobs>;
}

export const PriceOfJob = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="jobPrice">
            <h3>{t('filters.salary')}</h3>
            <div className="setting-jobPrice">
                <input
                    type="number"
                    min="0"
                    placeholder={t('filters.from')}
                    {...register('price.min')}
                />
                <input
                    type="number"
                    placeholder={t('filters.up-to')}
                    {...register('price.max')}
                />
            </div>
        </div>
    );
};
