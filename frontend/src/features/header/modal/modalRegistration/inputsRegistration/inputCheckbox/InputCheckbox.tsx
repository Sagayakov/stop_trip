import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { AuthRegistration } from '../../libr/RegistrationTypes';
import { useTranslation } from 'react-i18next';

interface Props {
    errors: FieldErrors<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
}

export const InputCheckbox = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="user-agreement">
            <label htmlFor="userAgreement" className="form-checkbox">
                <input
                    id="userAgreement"
                    // style={errors?.agreement ? {borderColor: 'red'} : {}}
                    {...register('agreement', { required: true })}
                    type="checkbox"
                />
                <span>
                    <p>
                        {t('modal-registration.accept')}{' '}
                        <a
                            href="#"
                            target="_blank"
                            onClick={(event) => event.stopPropagation()}
                            className="user-agreement-text"
                        >
                            {t('modal-registration.agreement')}
                        </a>
                    </p>
                </span>
            </label>
        </div>
    );
};
