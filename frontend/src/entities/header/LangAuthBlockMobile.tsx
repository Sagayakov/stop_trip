import { Person } from 'shared/ui/icons/icons-tools/Person.tsx';
import { useAppDispatch, useAppSelector } from 'app/store/hooks.ts';
import { toggleModalEnter } from 'features/header/model/modalAuth/reducers/toggleModal.ts';
import { Dispatch } from 'redux';
import { Langs } from 'entities/langs';
import styles from 'widgets/header/libr/header.module.scss';

interface Props {
    showUserMenu: boolean;
    setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
export const LangAuthBlockMobile = ({
    showUserMenu,
    setShowUserMenu,
}: Props) => {
    const dispatch: Dispatch = useAppDispatch();
    const isAuth = useAppSelector((state) => state.setIsAuth.isAuth);
    const toggle = useAppSelector((state) => state.toggleModalEnter.toggle);
    const handleToggleModal = () => dispatch(toggleModalEnter(!toggle));

    return (
        <div className={styles.language_auth}>
            <Langs />
            <Person
                stroke={isAuth ? '#1f6fde' : '#1C1C1E'}
                handleClick={
                    isAuth
                        ? () => setShowUserMenu(!showUserMenu)
                        : () => handleToggleModal()
                }
            />
        </div>
    );
};
