import { useTranslation } from 'react-i18next';
import styleForBnt from 'features/header/modal/authorizationForm/modalEnter/libr/formEnter.module.scss';
import { UseFormWatch } from 'react-hook-form';
import { ResetPasswordType } from '../libr/types';

interface Props {
    isValid: boolean;
    watch: UseFormWatch<ResetPasswordType>;
}

export const InputSubmit = ({ isValid, watch }: Props) => {
    const { t } = useTranslation();
    const password = watch('password');
    const repeatPassword = watch('repeat_password');

    return (
        <input
            className={styleForBnt.submit}
            type="submit"
            value={t('reset-page.update')}
            disabled={!isValid || password !== repeatPassword}
            style={{ marginTop: 0 }}
        />
    );
};
