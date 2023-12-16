import { ProductType } from 'pages/advertPage/libr/types.ts';
import './advertCharacteristics.scss';
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
                <div className="characteristics">
                    <h2 className="characteristics-header">
                        {t('advert-page.characteristics')}
                    </h2>
                    <div className="characteristics-wrapper">
                        <span className="characteristics-key">{keysList}</span>
                        <span className="characteristics-value">
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
