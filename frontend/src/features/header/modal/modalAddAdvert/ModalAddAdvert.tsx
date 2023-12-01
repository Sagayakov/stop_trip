import { Close } from '../../../../shared/ui/icons/icons-tools/Close';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { toggleModalEnter } from '../../model/modalAuth/reducers/toggleModal';
import './libr/modalAddAdvert.scss';
import { setIsEnter } from '../../model/modalAuth/reducers/isEnter';

type Props = {
    closeAddModal: (isOpen: boolean) => void;
};

export const ModalAddAdvert = ({ closeAddModal }: Props) => {
    const dispatch = useAppDispatch();
    const toggle = useAppSelector((state) => state.toggleModalEnter.toggle);
    const handleToggleModal = () => dispatch(toggleModalEnter(!toggle));

    const handleClick = (isEnter: boolean) => {
        handleToggleModal();
        dispatch(setIsEnter(isEnter));
        closeAddModal(false);
    };

    return (
        <div className="modal-add" onClick={() => closeAddModal(false)}>
            <div className="modal-add-content">
                <Close onclick={() => closeAddModal(false)} />
                Чтобы разместить объявление, необходимо{' '}
                <span className="auth-link" onClick={() => handleClick(true)}>
                    войти{' '}
                </span>
                или{' '}
                <span className="auth-link" onClick={() => handleClick(false)}>
                    зарегистрироваться
                </span>
            </div>
        </div>
    );
};
