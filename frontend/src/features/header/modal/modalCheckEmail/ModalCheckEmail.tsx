import { useState } from 'react';
import { Close } from '../../../../shared/ui/icons/icons-tools/Close';
import './modalCheckEmail.scss';
import { useTranslation } from 'react-i18next';

export const ModalCheckEmail = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { t } = useTranslation();

    return (
        <div
            className={isOpen ? 'modal-check' : 'close'}
            onClick={() => setIsOpen(false)}
        >
            <div className={isOpen ? 'modal-check-content' : 'close'}>
                <Close onclick={() => setIsOpen(false)} />
                {t('modal-check-email')}
            </div>
        </div>
    );
};
