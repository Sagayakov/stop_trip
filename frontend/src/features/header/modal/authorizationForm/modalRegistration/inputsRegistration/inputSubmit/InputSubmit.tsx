import { useTranslation } from 'react-i18next';
import styles from 'features/header/modal/authorizationForm/modalEnter/libr/formEnter.module.scss'
interface Props {
    isValid: boolean;
}

export const InputSubmit = ({ isValid }: Props) => {
    const { t } = useTranslation();

    return (
        <input
            type="submit"
            className={styles.submit}
            value={t('modal-registration.register')}
            disabled={!isValid}
        />
    );
};
