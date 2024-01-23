import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';
import styles from 'pages/mySettings/libr/mySettings.module.scss';
import { Control, FormState, UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SettingTypes } from 'pages/mySettings/types/settingTypes.ts';
import { useGetUserQuery } from 'app/api/fetchUser.ts';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { toast } from 'react-toastify';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
    MySettingCurrentPassword,
    MySettingName,
    MySettingNewPassword,
    MySettingPhone,
    MySettingReNewPassword,
} from 'features/mySetting';

interface Props {
    control: Control<SettingTypes, string>;
    watch: UseFormWatch<SettingTypes>;
    formState: FormState<SettingTypes>;
    isLoadingPassword: boolean;
    isLoadingMutation: boolean;
    mutationErrors: FetchBaseQueryError | SerializedError | undefined;
    passwordErrors: FetchBaseQueryError | SerializedError | undefined;
}

export const MySettingForm = (props: Props) => {
    const {
        control,
        watch,
        formState,
        isLoadingPassword,
        isLoadingMutation,
        mutationErrors,
        passwordErrors,
    } = props;
    const { errors } = formState;
    const { t } = useTranslation();
    const { accessToken } = getTokensFromStorage();
    const { data, isLoading } = useGetUserQuery(accessToken);

    const handleCopy = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        toast.error(`${t('modal-login.copy-password')}`);
    };

    return (
        <>
            {(isLoading || isLoadingMutation || isLoadingPassword) && (
                <LoadingWithBackground />
            )}
            {!data && <h1>{t('my-settings.no-data')}</h1>}
            {data && (
                <>
                    <p>
                        {t('my-settings.mail-address')}: <b>{data.email}</b>
                    </p>
                    <div className={styles.input_wrapper}>
                        <MySettingName
                            control={control}
                            data={data}
                            errors={errors}
                            mutationErrors={mutationErrors}
                        />
                        <MySettingPhone
                            control={control}
                            data={data}
                            errors={errors}
                            mutationErrors={mutationErrors}
                        />
                    </div>
                    <div className={styles.input_wrapper}>
                        <h2>{t('my-settings.password-change')}</h2>
                        <MySettingCurrentPassword
                            control={control}
                            errors={errors}
                            handleCopy={handleCopy}
                            passwordErrors={passwordErrors}
                        />
                        <MySettingNewPassword
                            control={control}
                            errors={errors}
                            handleCopy={handleCopy}
                            watch={watch}
                        />
                        <MySettingReNewPassword
                            control={control}
                            errors={errors}
                            handleCopy={handleCopy}
                            watch={watch}
                        />
                    </div>
                </>
            )}
        </>
    );
};
