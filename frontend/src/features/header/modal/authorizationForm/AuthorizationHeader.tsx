import styles from 'features/header/modal/modal.module.scss';
import { setIsEnter } from 'features/header/model/modalAuth/reducers/isEnter.ts';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'app/store/hooks.ts';

interface Props{
    isEnter: boolean;
}
export const AuthorizationHeader = ({ isEnter }: Props) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const classNameForEnter = () => {
        return isEnter
            ? `${styles.enter} ${styles.enter_active}`
            : `${styles.enter}`;
    };
    return (
        <div className={styles.modal_header}>
            <div
                className={classNameForEnter()}
                onClick={() => dispatch(setIsEnter(true))}
            >
                {t('modal-login.login')}
            </div>
            <div
                className={
                    isEnter
                        ? `${styles.registration}`
                        : `${styles.registration} ${styles.enter_active}`
                }
                onClick={() => dispatch(setIsEnter(false))}
            >
                {t('modal-registration.registration')}
            </div>
        </div>
    );
};