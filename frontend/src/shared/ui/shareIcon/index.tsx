import { Share } from '../icons/icons-tools/Share';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShareIcon = () => {
    const handleClick = (event:  React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        const path = window.location.href;

        navigator.clipboard.writeText(path).then(
            () => toast.info('Скопировано!'),
            (err) =>
                toast.error('Произошла ошибка при копировании текста: ', err)
        );
    };

    return (
        <div className="share-icon" onClick={handleClick}>
            <Share />
        </div>
    );
};
