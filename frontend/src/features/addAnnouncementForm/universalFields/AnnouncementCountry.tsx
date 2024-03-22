import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { Control, UseFormSetValue } from 'react-hook-form';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: { name: string } | null;
}

const AnnouncementCountry = ({ control, setValue }: Props) => {
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);
    const options = [
        { value: 'india', label: lang === 'ru' ? 'Индия' : 'India' },
    ];

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('add-page.country')}
                <span>*</span>:
            </h3>
            <UniversalSelectDropdown<FormAddAnn>
                setValue={setValue}
                control={control}
                name="country"
                prefix="filterAnnouncementCategory"
                placeholder={t('add-page.country')}
                closeMenuOnSelect={true}
                isMulti={false}
                options={options}
                defaultValue={options[0]}
                isDisabled={true}
                // defaultValue={options.find((el) => el.label === defaultValue?.name)}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
export default AnnouncementCountry;
