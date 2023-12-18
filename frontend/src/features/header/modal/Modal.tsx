import { useAppDispatch, useAppSelector } from 'app/store/hooks.ts';
import { Close } from 'shared/ui/icons/icons-tools/Close.tsx';
import { setIsEnter } from '../model/modalAuth/reducers/isEnter';
import { toggleModalEnter } from '../model/modalAuth/reducers/toggleModal';
import { FormEnter, FormRegistration } from './index';
import './modal.scss';
import { useTranslation } from 'react-i18next';

export const Modal = () => {
    const toggle = useAppSelector((state) => state.toggleModalEnter.toggle);
    const dispatch = useAppDispatch();
    const isEnter = useAppSelector((state) => state.setIsEnter.isEnter);
    const { t } = useTranslation();

    return (
        <div
            className={`modal ${toggle ? 'visible visible-wrapper' : ''}`}
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
                        {t('modal-login.login')}
                    </div>
                    <div
                        className={
                            isEnter
                                ? 'registration'
                                : 'registration enter-active'
                        }
                        onClick={() => dispatch(setIsEnter(false))}
                    >
                        {t('modal-registration.registration')}
                    </div>
                </div>
                {isEnter ? <FormEnter /> : <FormRegistration />}
            </div>
        </div>
    );
};
