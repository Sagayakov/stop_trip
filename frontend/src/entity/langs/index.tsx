import { useAppDispatch, useAppSelector } from 'app/store/hooks.ts';
import { setLang } from 'features/header/model/langsReducer/lang.ts';
import styles from './libr/langs.module.scss';
import { UniversalButton } from 'entity/universalEntites';

export const Langs = () => {
    const lang = useAppSelector((state) => state.setLang.lang);
    const dispatch = useAppDispatch();

    const handleClick = () => dispatch(setLang(lang === 'ru' ? 'en' : 'ru'));

    return (
        <div className={styles.language}>
            <UniversalButton
                className={
                    lang === 'ru'
                        ? `${styles.language_ru} ${styles.lang_active}`
                        : `${styles.language_ru}`
                }
                onClick={handleClick}
            >
                RU
            </UniversalButton>
            <UniversalButton
                className={
                    lang === 'en'
                        ? `${styles.language_eng} ${styles.lang_active}`
                        : `${styles.language_eng}`
                }
                onClick={handleClick}
            >
                EN
            </UniversalButton>
        </div>
    );
};
