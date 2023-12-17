import { Close } from 'shared/ui/icons/icons-tools/Close.tsx';
import { useAppDispatch, useAppSelector } from 'app/store/hooks.ts';
import { toggleModalEnter } from '../../model/modalAuth/reducers/toggleModal';
import './libr/modalAddAdvert.scss';
import { setIsEnter } from '../../model/modalAuth/reducers/isEnter';
import { useTranslation } from 'react-i18next';

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
        <div className="modal-add" onClick={() => closeAddModal(false)}>
            <div className="modal-add-content">
                <Close onclick={() => closeAddModal(false)} />
                {t('modal-add-advert.must')}{' '}
                <span className="auth-link" onClick={() => handleClick(true)}>
                    {t('modal-add-advert.login')}{' '}
                </span>
                {t('modal-add-advert.or')}{' '}
                <span className="auth-link" onClick={() => handleClick(false)}>
                    {t('modal-add-advert.register')}
                </span>
            </div>
        </div>
    );
};
