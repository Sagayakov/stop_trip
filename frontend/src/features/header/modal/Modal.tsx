import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { Close } from '../../../shared/ui/icons/icons-tools/Close';
import { setIsEnter } from '../model/modalAuth/reducers/isEnter';
import { toggleModalEnter } from '../model/modalAuth/reducers/toggleModal';
import { FormEnter, FormRegistration } from './index';
import './modal.scss';

export const Modal = () => {
    const toggle = useAppSelector((state) => state.toggleModalEnter.toggle);
    const dispatch = useAppDispatch();
    const isEnter = useAppSelector((state) => state.setIsEnter.isEnter);

    return (
        <div
            className={`modal ${toggle ? 'visible' : ''}`}
            // className="modal"
            // style={{ display: `${toggle ? 'block' : 'none'}` }}
            onClick={() => dispatch(toggleModalEnter(!toggle))}
        >
            <div
                className="modal-wrapper"
                onClick={(event) => event.stopPropagation()}
            >
                <Close onclick={() => dispatch(toggleModalEnter(false))} />
                <div className="modal-header">
                    <div
                        className={isEnter ? 'enter enter-active' : 'enter'}
                        onClick={() => dispatch(setIsEnter(true))}
                    >
                        Вход
                    </div>
                    <div
                        className={
                            isEnter
                                ? 'registration'
                                : 'registration enter-active'
                        }
                        onClick={() => dispatch(setIsEnter(false))}
                    >
                        Регистрация
                    </div>
                </div>
                {isEnter ? <FormEnter /> : <FormRegistration />}
            </div>
        </div>
    );
};
