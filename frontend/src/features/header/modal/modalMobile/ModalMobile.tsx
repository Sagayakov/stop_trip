import { Docs } from '../../../../shared/ui/icons/category/Docs'
import { Favorite } from '../../../../shared/ui/icons/icons-tools/Favorite'
import { Message } from '../../../../shared/ui/icons/icons-tools/Message'
import { Setting } from '../../../../shared/ui/icons/icons-tools/Setting'
import './modalMobile.scss'

interface Props {
    showUserMenu: boolean
    setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalMobile = (props: Props) => {
    const { showUserMenu, setShowUserMenu } = props

    return (
        <div
            className="modal-mobile"
            style={{ display: `${showUserMenu ? 'block' : 'none'}` }}
            onClick={() => setShowUserMenu(false)}>
            <div className="modal-mobile-content" onClick={event => event.stopPropagation()}>
                <div className="menu">
                    <div className="user-option">
                        <Docs color="#1C1C1E" />
                        <p className="user-option-text">Мои объявления</p>
                    </div>
                    <div className="user-option">
                        <Message color="#1C1C1E" stroke="#1C1C1E" />
                        <p className="user-option-text">Мои сообщения</p>
                    </div>
                    <div className="user-option">
                        <Favorite color="white" strokeColor="#1C1C1E" />
                        <p className="user-option-text">Избранные</p>
                    </div>
                    <div className="user-option">
                        <Setting color="#1C1C1E" stroke="#1C1C1E" />
                        <p className="user-option-text">Настройки</p>
                    </div>
                    <div className="language-auth">
                        <div className="language">
                            <div className="language-ru">RU</div>
                            <div className="language-eng">ENG</div>
                        </div>
                    </div>
                </div>
                <p>Выход</p>
            </div>
        </div>
    )
}
