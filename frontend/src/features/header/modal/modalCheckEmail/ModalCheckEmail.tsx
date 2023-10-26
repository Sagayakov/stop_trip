import { useState } from 'react';
import { Close } from '../../../../shared/ui/icons/icons-tools/Close';
import './modalCheckEmail.scss';

export const ModalCheckEmail = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div
            className={isOpen ? 'modal-check' : 'close'}
            onClick={() => setIsOpen(false)}
        >
            <div className={isOpen ? 'modal-check-content' : 'close'}>
                <Close onclick={() => setIsOpen(false)} />
                Чтобы завершить процесс регистрации, перейдите по ссылке,
                отправленной на указанный адрес электронной почты
            </div>
        </div>
    );
};
