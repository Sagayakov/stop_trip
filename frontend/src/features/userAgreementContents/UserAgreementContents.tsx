import { Link } from 'react-scroll';
import styles from './libr/userAgreementContents.module.scss';
import { useTranslation } from 'react-i18next';

export const UserAgreementContents = () => {
    const { t } = useTranslation();

    return (
        <>
            <h2>{t('user_agreement.contents')}</h2>
            <div className={styles.contents_list}>
                <ol>
                    <li>
                        <Link to="general" activeClass="active">
                            {t('user_agreement.1_header')}
                        </Link>
                    </li>
                    <li>
                        <Link to="subject" activeClass="active">
                            {t('user_agreement.2_header')}
                        </Link>
                    </li>
                    <li>
                        <Link to="responsibility" activeClass="active">
                            {t('user_agreement.3_header')}
                        </Link>
                    </li>
                    <li>
                        <Link to="rights" activeClass="active">
                            {t('user_agreement.4_header')}
                        </Link>
                    </li>
                    <li>
                        <Link to="dispute" activeClass="active">
                            {t('user_agreement.5_header')}
                        </Link>
                    </li>
                    <li>
                        <Link to="changes" activeClass="active">
                            {t('user_agreement.6_header')}
                        </Link>
                    </li>
                    <li>
                        <Link to="final" activeClass="active">
                            {t('user_agreement.7_header')}
                        </Link>
                    </li>
                    <li>
                        <Link to="processing" activeClass="active">
                            {t('user_agreement.8_header')}
                        </Link>
                    </li>
                </ol>
            </div>
        </>
    );
};
