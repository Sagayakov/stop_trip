import { Close } from 'shared/ui/icons/icons-tools/Close.tsx';
import { useAppDispatch, useAppSelector } from 'app/store/hooks.ts';
import { toggleModalEnter } from '../../model/modalAuth/reducers/toggleModal';
import styles from './libr/modalAddAdvert.module.scss';
import { setIsEnter } from '../../model/modalAuth/reducers/isEnter';
import { useTranslation } from 'react-i18next';
import { BackgroundModal } from 'shared/utils/BackgroundModal.tsx';

type Props = {
    closeAddModal: (isOpen: boolean) => void;
};

export const ModalAddAdvert = ({ closeAddModal }: Props) => {
    const dispatch = useAppDispatch();
    const toggle = useAppSelector((state) => state.toggleModalEnter.toggle);
    const handleToggleModal = () => dispatch(toggleModalEnter(!toggle));
    const { t } = useTranslation();

    const handleClick = (isEnter: boolean) => {
        handleToggleModal();
        dispatch(setIsEnter(isEnter));
        closeAddModal(false);
    };

    return (
        <>
            <BackgroundModal className={styles.modal_add} callback={() => closeAddModal(false)} />
            <div className={styles.modal_add_content}>
                <Close onclick={() => closeAddModal(false)} />
                {t('modal-add-advert.must')}{' '}
                <span className={styles.auth_link} onClick={() => handleClick(true)}>
                    {t('modal-add-advert.login')}{' '}
                </span>
                {t('modal-add-advert.or')}{' '}
                <span className={styles.auth_link} onClick={() => handleClick(false)}>
                    {t('modal-add-advert.register')}
                </span>
            </div>
        </>
    );
};
