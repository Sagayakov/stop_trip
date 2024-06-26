import { useEffect, useState } from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport, Price } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';
import { useAppSelector } from 'app/store/hooks';
import { getDashOptions } from 'shared/utils';

interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
    available_params: string[] | Price | undefined;
}

type SelectType = {
    label: string;
    value: string;
};

export const DriveType = ({ setValue, control, available_params }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);
    const [values, setValues] = useState<SelectType[]>([]);

    useEffect(() => {
        if (data && available_params) {
            const result = ( data['transport_drive_type'] as SelectType[] ).filter(
                (el) => (available_params as string[]).includes(el.value)
            );
            setValues(result as SelectType[]);
        }
    }, [data, available_params]);

    const options = getDashOptions(lang, values);

    return (
        <div className={styles.drive}>
            <h3>{t('filters.transport_drive_type')}</h3>
            <div className={styles.select_drive}>
                <UniversalSelectDropdown<TypeSettingTransport>
                    setValue={setValue}
                    control={control}
                    name="transport_drive_type"
                    prefix="filterForm"
                    placeholder={t('filters.transport_drive_type')}
                    closeMenuOnSelect={false}
                    isMulti={true}
                    options={options}
                    defaultValue={options.length === 1 ? options[0] : undefined}
                />
            </div>
        </div>
    );
};
