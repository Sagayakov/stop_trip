import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useTranslation } from 'react-i18next';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { UniversalRadioGroup } from 'entities/universalEntites/UniversalRadioGroup.tsx';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}
interface ChoicesType {
    name: keyof ProductType;
    choices: Values[];
}
interface Values{
    label: string | number
    value: string | number
}

export const TypeOfService = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();

    const options = data?.params.find((el) => el.name === 'transport_type_of_service') as ChoicesType;

    return (
        <div className="typeOfService">
            <h3>{t('filters.transport_type_of_service')}</h3>
            <div className="setting-typeOfService">
                {
                    data && (
                        <UniversalRadioGroup
                            register={register}
                            radioValues={options.choices}
                            name="transport_type_of_service"
                        />
                    )
                }
            </div>
        </div>
    );
};
