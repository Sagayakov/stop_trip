import { ProductType } from '../../pages/advertPage/libr/types';
import './advertCharacteristics.scss';
import { getValuesList } from './utils/getValuesList';
import { getKeysList } from './utils/getKeysList';

export const AdvertCharacteristics = ({ data }: { data: ProductType }) => {
    const { category } = data;

    return (
        <div className="characteristics">
            <h2 className="characteristics-header">Характеристики</h2>
            <div className="characteristics-wrapper">
                <span className="characteristics-key">
                    {getKeysList({ data, category })}
                </span>
                <span className="characteristics-value">
                    {getValuesList({ data, category })}
                </span>
            </div>
        </div>
    );
};
