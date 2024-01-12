import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground.tsx';
import styles from 'pages/mySettings/libr/mySettings.module.scss';
import { Control, FieldPath, FormState, UseFormWatch } from 'react-hook-form';
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
    MySettingReNewPassword
} from 'features/mySetting';

interface Props {
    control: Control<SettingTypes, string>;
    watch: UseFormWatch<SettingTypes>;
    formState: FormState<SettingTypes>;
    isLoadingPassword: boolean;
    isLoadingMutation: boolean;
    passwordErrors: FetchBaseQueryError | SerializedError | undefined;
    clearErrors: (
        name?:
            | FieldPath<SettingTypes>
            | FieldPath<SettingTypes>[]
            | `root.${string}`
            | 'root'
    ) => void;
}

export const MySettingForm = (props: Props) => {
    const {
        control,
        watch,
        formState: { errors },
        isLoadingPassword,
        isLoadingMutation,
        passwordErrors,
    } = props;

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
            {!data && <h1>lox</h1>}
            {data && (
                <>
                    <p>
                        Ваш почтовый адрес: <b>{data.email}</b>
                    </p>
                    <div className={styles.input_wrapper}>
                        <MySettingName control={control} data={data} />
                        <MySettingPhone control={control} data={data} />
                    </div>
                    <div className={styles.input_wrapper}>
                        <h2>Смена пароля</h2>
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
