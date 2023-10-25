import { UseFormRegister } from 'react-hook-form';
import { AuthData } from '../libr/EnterType';

interface Props {
    register: UseFormRegister<AuthData>;
}

export const CheckboxRememberMe = ({ register }: Props) => {
    return (
        <div className="remember-me">
            <label className="form-checkbox">
                <input type="checkbox" {...register('rememberMe')} />
                <span>Запомнить аккаунт</span>
            </label>
        </div>
    );
};
