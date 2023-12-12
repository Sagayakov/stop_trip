import { ProductType } from '../../pages/advertPage/libr/types';
import './advertCharacteristics.scss';
import { getValuesList } from './utils/getValuesList';
import { getKeysList } from './utils/getKeysList';

export const AdvertCharacteristics = ({ data }: { data: ProductType }) => {
    const { category } = data;
    const keysList = getKeysList({ data, category });
    const valuesList = getValuesList({ data, category });

    return (
        <>
            {keysList.length ? (
                <div className="characteristics">
                    <h2 className="characteristics-header">Характеристики</h2>
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
