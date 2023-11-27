import { useNavigate } from "react-router-dom";
import { Category, categories } from "../../../../shared/const/categories";
import './libr/categoryСhoice.scss'

interface Props {
    showAddAdvertisementModal: boolean;
    setShowAddAdvertisementModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CategoryChoice = ({ showAddAdvertisementModal, setShowAddAdvertisementModal }: Props) => {
    const navigate = useNavigate();
    const navigateAndClose = (el: [string, Category]) => {
        setShowAddAdvertisementModal(false);
        navigate(`/add-advert/${el[0]}`);
    };
    return (
        <div
            className="modal-choiceCategories"
            style={{
                display: `${showAddAdvertisementModal ? 'flex' : 'none'}`,
            }}
            onClick={() => setShowAddAdvertisementModal(false)}
        >
            <div
                className="choiceCategory-content"
                onClick={(event) => event.stopPropagation()}
            >
                {Object.entries(categories).map((el) => {
                    return (
                        <div
                            key={el[0]}
                            className="choice-category"
                            onClick={() => navigateAndClose(el)}
                        >
                            <span>{el[1].description}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
