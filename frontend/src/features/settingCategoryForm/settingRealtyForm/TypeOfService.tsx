import { UniversalCheckboxGroup } from 'entities/universalEntites';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormRegister } from 'react-hook-form';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { ChoicesType } from 'app/api/types/filtersType.ts';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}
interface Options {
    value: string | number;
    label: string | number;
}

export const TypeOfService = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [typesValues, setTypesValues] = useState<Options[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find(
                    (el) => el.name === 'property_type_of_service'
                ) as ChoicesType
            ).choices.filter(
                (el) => (el as Options).value && (el as Options).label
            );
            data && setTypesValues(result as Options[]);
        }
    }, [data]);

    return (
        <>
            <div className="typeOfService">
                <h3>{t('filters.property_type_of_service')}</h3>
                <UniversalCheckboxGroup
                    checkboxValues={typesValues}
                    name="property_type_of_service"
                    register={register}
                />
            </div>
        </>
    );
};


