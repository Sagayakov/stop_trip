import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { TypeSettingAdverts } from '../../widgets/settingForm/TypeSettingAdverts';

interface Props {
    watch: UseFormWatch<TypeSettingAdverts>;
    register: UseFormRegister<TypeSettingAdverts>;
}

export const SettingPrice = ({ register, watch }: Props) => {
    const radio = watch('settingPrice.adverts');
    const checkedStyle = {
        color: 'white',
        backgroundColor: '#1F6FDE',
    };

    return (
        <div className="setting-price">
            <h3>Цена</h3>
            <div className="setting-price-adverts">
                <label style={radio === '100' ? checkedStyle : {}}>
                    <input
                        type="radio"
                        value="100"
                        {...register('settingPrice.adverts')}
                    />
                    До 100$
                </label>
                <label style={radio === '500' ? checkedStyle : {}}>
                    <input
                        type="radio"
                        value="500"
                        {...register('settingPrice.adverts')}
                    />
                    До 500$
                </label>
                <label style={radio === '1000' ? checkedStyle : {}}>
                    <input
                        type="radio"
                        value="1000"
                        {...register('settingPrice.adverts')}
                    />
                    До 1000$
                </label>
            </div>
            <div className="setting-price-inputs">
                <input
                    id="setting-price-input-min"
                    type="number"
                    placeholder="От"
                    {...register('settingPrice.min')}
                />
                <input
                    id="setting-price-input-max"
                    type="number"
                    placeholder="До"
                    {...register('settingPrice.max')}
                />
            </div>
        </div>
    );
};
