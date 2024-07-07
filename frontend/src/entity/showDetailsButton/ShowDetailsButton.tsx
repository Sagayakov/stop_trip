import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from 'shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from 'shared/ui/icons/icons-tools/ArrowTop';
import s from './showDetailsButton.module.scss';

type ShowDetailsButtonProps = {
    isOpen: boolean;
    onClick: () => void;
};

export const ShowDetailsButton = ({ isOpen, onClick }: ShowDetailsButtonProps) => {
    const { t } = useTranslation();

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClick();
    }
    
    return (
        <button className={s.button} onClick={(e) => handleClick(e)}>
            {t('add-page.additional')}
            {isOpen ? <ArrowTop /> : <ArrowDown />}
        </button>
    );
};
