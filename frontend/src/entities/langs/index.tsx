import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { setLang } from '../../features/header/model/langsReducer/lang';

export const Langs = () => {
    const lang = useAppSelector((state) => state.setLang.lang);
    const dispatch = useAppDispatch();

    const handleClick = () => dispatch(setLang(lang === 'ru' ? 'en' : 'ru'));

    return (
        <div className="language">
            <div
                className={
                    lang === 'ru' ? 'language-ru lang-active' : 'language-ru'
                }
                onClick={handleClick}
            >
                RU
            </div>
            <div
                className={
                    lang === 'en' ? 'language-eng lang-active' : 'language-eng'
                }
                onClick={handleClick}
            >
                ENG
            </div>
        </div>
    );
};
