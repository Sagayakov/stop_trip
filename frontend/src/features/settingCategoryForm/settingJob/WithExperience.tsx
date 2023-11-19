import { UseFormRegister } from 'react-hook-form';
import { TypesOfJobs } from '../../../widgets/settingForm/settingJob/libr/TypesOfJobs';

interface Props {
    register: UseFormRegister<TypesOfJobs>;
}

export const WithExperience = ({ register }: Props) => {
    return (
        <div className="withExperience">
            <h3>С опытом</h3>
            <div className="setting-withExperience">
                <label className="form-checkbox">
                    <input type="checkbox" {...register('withExperience')} />
                    <span>С опытом</span>
                </label>
            </div>
        </div>
    );
};
