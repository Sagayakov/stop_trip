import { Share } from '../icons/icons-tools/Share';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShareIcon = () => {
    const handleClick = () => {
        const path = document.location.href;
        console.log(path);
        toast.info('Скопировано!');
    };

    return (
        <div className="share-block">
            <div className="share-icon" onClick={handleClick}>
                <Share />
            </div>
            <ToastContainer />
        </div>
    );
};
