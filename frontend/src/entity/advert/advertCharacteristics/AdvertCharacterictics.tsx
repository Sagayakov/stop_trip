import { ProductType } from 'pages/advertPage/libr/types.ts';
import styles from './advertCharacteristics.module.scss';
import { useTranslation } from 'react-i18next';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { unInformative } from './utils/unInformativeFields.ts';
import { useEffect, useState } from 'react';
import { CharacteristicsListType } from './utils/types.ts';
import { getValue } from './utils/getValue.tsx';

export const AdvertCharacteristics = ({ data }: { data: ProductType }) => {
    const { t } = useTranslation();
    const { data: filtersData } = useGetFiltersQuery('');
    const [list, setList] = useState<CharacteristicsListType | undefined>();

    useEffect(() => {
        const filteredList = Object.entries(data)
            .filter((item) => !unInformative.includes(item[0]))
            .filter((item) =>
                Array.isArray(item[1]) ? item[1].length : item[1]
            );

        setList(filteredList as CharacteristicsListType);
    }, [data]);

    return (
        <>
            {list && list.length && filtersData ? (
                <div className={styles.characteristics}>
                    <h2 className={styles.characteristics_header}>
                        {t('advert-page.characteristics')}
                    </h2>
                    {list.map((el) => {
                        const value = getValue(el[0], el[1], filtersData);
                        return (
                            <div
                                className={styles.characteristics_wrapper}
                                key={el[0]}
                            >
                                <span
                                    className={`${styles.characteristics_key} ${el[0]}`}
                                >
                                    {t(`filters.${el[0]}`)}
                                    <span className={styles.dashes}></span>
                                </span>
                                <span className={styles.characteristics_value}>
                                    {value === true ? t('filters.yes') : value}
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
