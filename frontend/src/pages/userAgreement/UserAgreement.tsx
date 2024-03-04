import { UserAgreementContents } from 'features/userAgreementContents/UserAgreementContents';
import styles from './libr/userAgreement.module.scss';
import { UserAgreementPoints } from 'features/userAgreementPoints/UserAgreementPoints';
import { useTranslation } from 'react-i18next';

const UserAgreement = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.user_agreement}>
            <h1 className={styles.user_agreement_header}>
                {t('user_agreement.main_header')}
            </h1>
            <section className={styles.contents_wrapper}>
                <UserAgreementContents />
            </section>
            <section className={styles.points_wrapper}>
                <UserAgreementPoints />
            </section>
        </div>
    );
};

export default UserAgreement;
