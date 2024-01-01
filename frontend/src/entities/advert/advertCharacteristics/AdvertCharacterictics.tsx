import { ProductType } from 'pages/advertPage/libr/types.ts';
import styles from './advertCharacteristics.module.scss';
import { GetValuesList } from './utils/getValuesList.tsx';
import { GetKeysList } from './utils/getKeysList.tsx';
import { useTranslation } from 'react-i18next';

export const AdvertCharacteristics = ({ data }: { data: ProductType }) => {
    const { category } = data;
    const keysList = GetKeysList({ data, category });
    const valuesList = GetValuesList({ data, category });
    const { t } = useTranslation();

    return (
        <>
            {keysList.length ? (
                <div className={styles.characteristics}>
                    <h2 className={styles.characteristics_header}>
                        {t('advert-page.characteristics')}
                    </h2>
                    {valuesList.map((el, i) => {
                        return (
                            <div
                                className={styles.characteristics_wrapper}
                                key={el.key}
                            >
                                <span
                                    className={`${styles.characteristics_key} ${el.key}`}
                                >
                                    {keysList[i]}
                                </span>
                                <span className={styles.characteristics_value}>
                                    {el}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
