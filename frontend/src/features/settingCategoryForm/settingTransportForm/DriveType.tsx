import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { SelectType } from 'app/api/types/filtersType.ts';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';

interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
}
interface ChoicesType {
    name: keyof ProductType;
    choices: SelectType[];
}

export const DriveType = ({ setValue, control }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();

    const options = data?.params.find(
        (el) => el.name === 'transport_drive_type'
    ) as ChoicesType;

    return (
        <div className={styles.drive}>
            <h3>{t('filters.transport_drive_type')}</h3>
            <div className={styles.select_drive}>
                {data && (
                    <UniversalSelectDropdown<TypeSettingTransport>
                        setValue={setValue}
                        control={control}
                        name="transport_drive_type"
                        prefix="filterForm"
                        placeholder={t('filters.transport_drive_type')}
                        closeMenuOnSelect={false}
                        isMulti={true}
                        options={options.choices}
                    />
                )}
            </div>
        </div>
    );
};
