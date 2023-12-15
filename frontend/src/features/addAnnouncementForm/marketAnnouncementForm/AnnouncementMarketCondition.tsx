import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementMarketCondition = ({ register }: Props) => {
    const { t } = useTranslation();
    const conditionValues = [
        { label: `${t('filters.used')}`, value: 'used' },
        { label: `${t('filters.new')}`, value: 'new' },
    ];

    return (
        <div className="ann-field">
            <h3>{t('filters.market_condition')}:</h3>
            <UniversalRadioGroup
                register={register}
                name="market_condition"
                radioValues={conditionValues}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
