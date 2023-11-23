import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '../../../shared/ui/icons/icons-tools/ArrowRight';
import './modal-categories.scss';
import { Category, categories } from '../../../shared/const/categories';

interface Props {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalWindow = ({ showModal, setShowModal }: Props) => {
    const navigate = useNavigate();
    const navigateAndClose = (el: [string, Category]) => {
        setShowModal(false);
        navigate(`/${el[0]}`);
    };

    return (
        <div
            className="modal-categories"
            style={{ display: `${showModal ? 'flex' : 'none'}` }}
            onClick={() => setShowModal(false)}
        >
            <div
                className="modal-content"
                onClick={(event) => event.stopPropagation()}
            >
                {Object.entries(categories).map((el) => {
                    return (
                        <div
                            key={el[0]}
                            className="modal-category"
                            onClick={() => navigateAndClose(el)}
                            // onClick={() => navigate(`/${el[0]}`)}
                        >
                            <span>{el[1].description}</span>
                            <ArrowRight color="#1C1C1E" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
