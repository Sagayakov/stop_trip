import { ProductType } from 'pages/advertPage/libr/types.ts';
import styles from './advertCharacteristics.module.scss';
import { GetValuesList } from './utils/getValuesList';
import { GetKeysList } from './utils/getKeysList';
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
                    <div className={styles.characteristics_wrapper}>
                        <span className={styles.characteristics_key}>{keysList}</span>
                        <span className={styles.characteristics_value}>
                            {valuesList}
                        </span>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
