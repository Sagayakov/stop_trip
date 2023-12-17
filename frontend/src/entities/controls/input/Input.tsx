import { Find } from 'shared/ui/icons/icons-tools/Find.tsx';
import { useTranslation } from 'react-i18next';

export const Input = () => {
    const { t } = useTranslation();

    return (
        <div className="input-wrapper">
            <Find />
            <input placeholder={t('main-page.find')} />
        </div>
    );
};
