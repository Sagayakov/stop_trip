import { useTranslation } from 'react-i18next';
import styleForBnt from 'features/header/modal/authorizationForm/modalEnter/libr/formEnter.module.scss'

interface Props {
    isValid: boolean;
}

export const InputSubmit = ({ isValid }: Props) => {
    const { t } = useTranslation();

    return (
        <input
            className={styleForBnt.submit}
            type="submit"
            value={t('reset-page.update')}
            disabled={!isValid}
            style={{marginTop: 0}}
        />
    );
};
