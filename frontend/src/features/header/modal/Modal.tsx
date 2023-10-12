import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks'
import { Close } from '../../../shared/ui/icons/icons-tools/Close'
import { toggleModalEnter } from '../model/modalAuth/reducers/toggleModal'
import { FormEnter, FormRegistration } from './index'
import './modal.scss'

export const Modal = () => {
    const [isRegister, setIsRegister] = useState(false)
    const toggle = useAppSelector((state) => state.toggleModalEnter.toggle)
    const dispatch = useAppDispatch()
    const handleEnterText = () => setIsRegister(!isRegister)
    return (
        <div
            className="modal"
            style={{ display: `${toggle ? 'block' : 'none'}` }}
            onClick={() => dispatch(toggleModalEnter(!toggle))}>
            <div className="modal-wrapper" onClick={(event) => event.stopPropagation()}>
                <Close onclick={() => dispatch(toggleModalEnter(false))} />
                <div className="modal-header">
                    <div
                        onClick={handleEnterText}
                        className={isRegister ? 'enter enter-active' : 'enter'}>
                        Вход
                    </div>
                    <div
                        onClick={handleEnterText}
                        className={isRegister ? 'registration' : 'registration enter-active'}>
                        Регистрация
                    </div>
                </div>
                {isRegister ? <FormEnter /> : <FormRegistration />}
            </div>
        </div>
    )
}
