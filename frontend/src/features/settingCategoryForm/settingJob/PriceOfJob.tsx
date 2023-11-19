import { UseFormRegister } from 'react-hook-form';
import { TypeOfJob } from 'widgets/settingForm/settingJob/libr/TypesOfJobs';
interface Props {
    register: UseFormRegister<TypeOfJob>;
}
export const PriceOfJob = ({ register }: Props) => {
    return (
        <div className="jobPrice">
            <h3>Цена</h3>
            <div className="setting-jobPrice">
                <input
                    type="number"
                    min="0"
                    placeholder="От"
                    {...register('price.min')}
                />
                <input
                    type="number"
                    placeholder="До"
                    {...register('price.max')}
                />
            </div>
        </div>
    );
};
