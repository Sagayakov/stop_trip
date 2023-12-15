import { useTranslation } from 'react-i18next';

interface Props {
    isValid: boolean;
}

export const InputSubmit = ({ isValid }: Props) => {
    const { t } = useTranslation();

    return (
        <input
            type="submit"
            className="submit"
            value={t('modal-registration.register')}
            disabled={!isValid}
        />
    );
};
