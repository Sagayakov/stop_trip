import { useAppDispatch, useAppSelector } from 'app/store/hooks.ts';
import { Close } from 'shared/ui/icons/icons-tools/Close.tsx';
import { toggleModalEnter } from '../model/modalAuth/reducers/toggleModal';
import { FormEnter, FormRegistration } from './index';
import styles from './modal.module.scss';
import { ResetPasswordForm } from 'features/header/modal/authorizationForm/modalResetPassword/ResetPasswordForm.tsx';
import { setIsResetPasswordModalOpen } from 'features/header/model/modalAuth/reducers/isResetPasswordModalOpen.ts';
import { AuthorizationHeader } from 'features/header/modal/authorizationForm/AuthorizationHeader.tsx';

export const Modal = () => {
    const toggle = useAppSelector((state) => state.toggleModalEnter.toggle);
    const dispatch = useAppDispatch();
    const isEnter = useAppSelector((state) => state.setIsEnter.isEnter);
    const isResetPasswordModalOpen = useAppSelector(
        (state) => state.setIsResetPasswordModalOpen.isResetPasswordModalOpen
    );

    const classNameForModalBackground = () => {
        const visible = toggle
            ? `${styles.visible} ${styles.visible_wrapper}`
            : '';
        return `${styles.modal} ${visible}`;
    };
    const handleClose = () => {
        dispatch(toggleModalEnter(false));
        setTimeout(() => {
            dispatch(setIsResetPasswordModalOpen(false));
        }, 500); //без таймаута сначала появляется окно с входом
    };

    return (
        <div className={classNameForModalBackground()} onClick={handleClose}>
            <div
                className={styles.modal_wrapper}
                onClick={(event) => event.stopPropagation()}
            >
                <button className={styles.close}>
                    <Close onclick={handleClose} />
                </button>
                {isResetPasswordModalOpen ? (
                    <ResetPasswordForm />
                ) : (
                    <>
                        <AuthorizationHeader isEnter={isEnter} />
                        {isEnter ? <FormEnter /> : <FormRegistration />}
                    </>
                )}
            </div>
        </div>
    );
};
