import { Langs } from 'entities/langs';
import { Person } from 'shared/ui/icons/icons-tools/Person.tsx';
import { useAppDispatch, useAppSelector } from 'app/store/hooks.ts';
import { Dispatch } from 'redux';
import { toggleModalEnter } from 'features/header/model/modalAuth/reducers/toggleModal.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/header/libr/header.module.scss'
import { UniversalButton } from 'entities/universalEntites';
interface Props {
    showUserMenu: boolean;
    setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LangAuthBlockDesctop = ({ showUserMenu, setShowUserMenu }: Props) => {
    const dispatch: Dispatch = useAppDispatch();
    const isAuth = useAppSelector((state) => state.setIsAuth.isAuth);
    const toggle = useAppSelector((state) => state.toggleModalEnter.toggle);
    const handleToggleModal = () => dispatch(toggleModalEnter(!toggle));
    const { t } = useTranslation();

    return (
        <div className={styles.language_auth}>
            <Langs />
            {isAuth ? (
                <div className={styles.person_auth}>
                    <Person
                        stroke={isAuth ? '#1f6fde' : '#1C1C1E'}
                        handleClick={() => setShowUserMenu(!showUserMenu)}
                    />
                </div>
            ) : (
                <UniversalButton className={styles.auth_button} onClick={handleToggleModal}>
                    {t('main-page.login-register')}
                </UniversalButton>
            )}
        </div>
    );
};
