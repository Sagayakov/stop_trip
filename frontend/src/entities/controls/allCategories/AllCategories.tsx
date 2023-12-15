import { Burger } from '../../../shared/ui/icons/icons-tools/Burger';
import { useTranslation } from 'react-i18next';

interface Props {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AllCategories = ({ showModal, setShowModal }: Props) => {
    const { t } = useTranslation();

    return (
        <div
            className="button-all-categories"
            onClick={() => setShowModal(!showModal)}
        >
            <Burger color="white" />
            {t('main-page.all-categories')}
        </div>
    );
};
