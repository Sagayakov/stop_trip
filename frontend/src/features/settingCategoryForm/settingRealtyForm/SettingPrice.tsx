import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';

interface Props {
    watch: UseFormWatch<TypeSettingRealty>;
    register: UseFormRegister<TypeSettingRealty>;
}

export const SettingPrice = ({ register, watch }: Props) => {
    const radio = watch('price.adverts');
    const checkedStyle = {
        color: 'white',
        backgroundColor: '#1F6FDE',
    };

    return (
        <div className="setting-price">
            <h3>Цена</h3>
            <div className="setting-price-announcement">
                <label style={radio === '100' ? checkedStyle : {}}>
                    <input
                        type="radio"
                        value="100"
                        {...register('price.adverts')}
                    />
                    До 100$
                </label>
                <label style={radio === '500' ? checkedStyle : {}}>
                    <input
                        type="radio"
                        value="500"
                        {...register('price.adverts')}
                    />
                    До 500$
                </label>
                <label style={radio === '1000' ? checkedStyle : {}}>
                    <input
                        type="radio"
                        value="1000"
                        {...register('price.adverts')}
                    />
                    До 1000$
                </label>
            </div>
            <div className="setting-price-inputs">
                <input
                    id="price-input-min"
                    type="number"
                    min="0"
                    placeholder="От"
                    {...register('price.min')}
                />
                <input
                    id="price-input-max"
                    type="number"
                    placeholder="До"
                    {...register('price.max')}
                />
            </div>
        </div>
    );
};
