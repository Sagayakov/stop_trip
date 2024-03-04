import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { AuthRegistration } from '../../libr/RegistrationTypes';
import { useTranslation } from 'react-i18next';
import styles from '../../libr/formRegistration.module.scss';

interface Props {
    errors: FieldErrors<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
}

export const InputCheckbox = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.user_agreement}>
            <label
                htmlFor="userAgreement"
                className={`${styles.form_checkbox} form_checkbox`}
            >
                <input
                    id="userAgreement"
                    {...register('agreement', { required: true })}
                    type="checkbox"
                />
                <span>
                    <p>
                        {t('modal-registration.accept')}{' '}
                        <a
                            href="/user-agreement"
                            target="_blank"
                            onClick={(event) => event.stopPropagation()}
                            className={styles.user_agreement_text}
                        >
                            {t('modal-registration.agreement')}
                        </a>
                    </p>
                </span>
            </label>
        </div>
    );
};
