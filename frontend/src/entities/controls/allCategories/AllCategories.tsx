import { Burger } from '../../../shared/ui/icons/icons-tools/Burger'

interface Props {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const AllCategories = ({showModal, setShowModal}: Props) => {
    return (
        <div className="button-all-categories" onClick={() => setShowModal(!showModal)}>
            <Burger color="white" />
            Все категории
        </div>
    )
}
