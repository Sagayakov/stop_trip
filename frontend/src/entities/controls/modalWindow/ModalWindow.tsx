import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'shared/ui/icons/icons-tools/ArrowRight.tsx';
import './modal-categories.scss';
import { Category, categories } from 'shared/const/categories.tsx';
import { useTranslation } from 'react-i18next';

interface Props {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalWindow = ({ showModal, setShowModal }: Props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const navigateAndClose = (el: [string, Category]) => {
        setShowModal(false);
        navigate(`/${el[0]}/?category=${el[0]}`);
    };

    return (
        <div
            className={`modal-categories ${showModal ? 'visible' : ''}`}
            // className="modal-categories"
            // style={{ display: `${showModal ? 'flex' : 'none'}` }}
            onClick={() => setShowModal(false)}
        >
            <div
                // className="modal-content"
                className={`modal-content ${
                    showModal ? 'visible-content' : ''
                }`}
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
                            <span>{t(`categories.${el[0]}`)}</span>
                            <ArrowRight color="#1C1C1E" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
