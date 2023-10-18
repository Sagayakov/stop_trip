import { Close } from '../../../../shared/ui/icons/icons-tools/Close';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { toggleModalEnter } from '../../model/modalAuth/reducers/toggleModal';
import './modalAddAdvert.scss';

type Props = {
    closeAddModal: (isOpen: boolean) => void;
};

export const ModalAddAdvert = ({ closeAddModal }: Props) => {
    const dispatch = useAppDispatch();
    const toggle = useAppSelector((state) => state.toggleModalEnter.toggle);
    const handleToggleModal = () => dispatch(toggleModalEnter(!toggle));

    const handleClick = () => {
        handleToggleModal();
        closeAddModal(false);
    };

    return (
        <div className="modal-add" onClick={() => closeAddModal(false)}>
            <div className="modal-add-content">
                <Close onclick={() => closeAddModal(false)} />
                Чтобы разместить объявление, необходимо{' '}
                <span className="auth-link" onClick={handleClick}>
                    войти{' '}
                </span>
                или{' '}
                <span className="auth-link" onClick={handleClick}>
                    зарегистрироваться
                </span>
            </div>
        </div>
    );
};
