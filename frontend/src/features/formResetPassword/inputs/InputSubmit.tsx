import { useTranslation } from 'react-i18next';

interface Props {
    isValid: boolean;
}

export const InputSubmit = ({ isValid }: Props) => {
    const { t } = useTranslation();

    return (
        <input
            className="submit"
            type="submit"
            value={t('reset-page.update')}
            disabled={!isValid}
        />
    );
};
