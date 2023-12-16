import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { TypesOfJobs } from 'widgets/settingForm/settingJob/libr/TypesOfJobs.ts';
import { SelectOption } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { ChoicesType, SelectType } from 'app/api/types/filtersType.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    setValue: UseFormSetValue<TypesOfJobs>;
    control: Control<TypesOfJobs, string[]>;
}

export const TypeOfPayment = ({ control, setValue }: Props) => {
    const animated = makeAnimated();
    const { data } = useGetFiltersQuery('');
    const [paymentValues, setPaymentValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find(
                    (el) => el.name === 'job_payment_type'
                ) as ChoicesType
            ).choices.filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setPaymentValues(result as SelectType[]);
        }
    }, [data]);

    const handleChange = (
        selectedOptions: SelectOption | SelectOption[] | null
    ) => {
        if (selectedOptions) {
            const optionsArray = Array.isArray(selectedOptions)
                ? selectedOptions
                : [selectedOptions];
            const selectedValues = optionsArray
                .map((option) => option?.value)
                .filter(Boolean);
            setValue('job_payment_type', selectedValues);
        }
    };
    return (
        <>
            <div className="typeOfPayment">
                <h3>{t('filters.job_payment_type')}</h3>
                <Controller
                    name="job_payment_type"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            classNamePrefix="filterJobForm"
                            id="typeOfPayment"
                            components={animated}
                            placeholder={t('filters.job_payment_type')}
                            closeMenuOnSelect={false}
                            isMulti={true}
                            options={paymentValues}
                            onChange={(selectedOptions) => {
                                handleChange(
                                    selectedOptions as
                                        | SelectOption
                                        | SelectOption[]
                                        | null
                                );
                            }}
                            value={paymentValues.filter(
                                (option) =>
                                    field.value?.includes(
                                        option.value as string
                                    )
                            )}
                        />
                    )}
                />
            </div>
        </>
    );
};
