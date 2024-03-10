import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { Option, SettingMessengerType } from './libr/types';
import styles from 'widgets/settingMessengers/libr/settingMessengers.module.scss';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './libr/reactSelect.styles.scss';
import { useAddMessengerMutation } from 'app/api/fetchMessengers';
import { Messenger, UserMessenger } from 'pages/advertPage/libr/types';
import { Link } from 'react-router-dom';
import { getDescriptionDetails, getPattern } from './libr/utils';

type AddMessengerFormProps = {
    messengers: UserMessenger[];
    allMessengers: Messenger[];
};

export const AddMessengerForm = ({
    messengers,
    allMessengers,
}: AddMessengerFormProps) => {
    const [addMessenger, response] = useAddMessengerMutation();
    const { t } = useTranslation();
    const [prefix, setPrefix] = useState('');
    const [prefixIcon, setPrefixIcon] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const {
        control,
        setValue,
        handleSubmit,
        formState: { isValid, errors },
        reset,
        watch,
    } = useForm<SettingMessengerType>({
        mode: 'all',
    });

    const dataOptions = allMessengers
        .filter(
            (el) => !messengers.map((item) => item.messenger.id).includes(el.id)
        )
        .map((el) => ({
            value: el.name,
            option: el.name,
        }));

    const selectValue = watch('messenger');

    const handleChange = (selected: Option | null) => {
        if (selected) {
            const messengerPrefix = allMessengers.find(
                (el) => el.name === selected.value
            )!.link_to_messenger;
            setPrefix(messengerPrefix || '');
            setPrefixIcon(`/icons/icon${selected.value}.png`);
            setValue('messenger', selected.value);
        }
    };

    const onsubmit: SubmitHandler<SettingMessengerType> = (data) => {
        const { messenger, link_to_user } = data;
        const messengerId = allMessengers.find(
            (el) => el.name === messenger
        )!.id;
        const body = { messenger: messengerId, link_to_user };
        addMessenger({ body });

        setTooltipVisible(false);
        reset();
    };

    const description = allMessengers.find((el) => el.name === selectValue)
        ?.description;
    const { descriptionText, descriptionLink } =
        getDescriptionDetails(description);

    return (
        <>
            <form
                className={styles.add_messenger_form}
                onSubmit={handleSubmit(onsubmit)}
            >
                <ReactSelect
                    name="messenger"
                    required
                    options={dataOptions}
                    className={styles.messenger_select_wrapper}
                    classNamePrefix="messenger_select"
                    onChange={(selected) => handleChange(selected)}
                    isMulti={false}
                    placeholder={t('my-settings.select-messenger')}
                    formatOptionLabel={(option) => (
                        <div className={styles.select_option}>
                            <img
                                src={`/icons/icon${option.value}.png`}
                                alt={option.value}
                            />
                            <span>{option.value}</span>
                        </div>
                    )}
                />
                <span className={styles.prefix_span}>
                    <img src={prefixIcon} />
                    {prefix}
                </span>
                <Controller
                    name="link_to_user"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: true,
                        pattern: getPattern(selectValue),
                    }}
                    render={({ field }) => (
                        <div className={styles.link_wrapper}>
                            <input
                                {...field}
                                type="text"
                                placeholder="username"
                                className={
                                    !errors?.link_to_user
                                        ? styles.link_input
                                        : `${styles.link_input} ${styles.link_input_error}`
                                }
                                onFocus={() => setTooltipVisible(true)}
                            />
                            {tooltipVisible && (
                                <p className={styles.link_tooltip}>
                                    {descriptionText}
                                    <Link to={descriptionLink} target="_blank">
                                        {descriptionLink}
                                    </Link>
                                </p>
                            )}
                        </div>
                    )}
                />
                <input
                    type="submit"
                    className={styles.submit}
                    disabled={!isValid || !selectValue}
                    value="+"
                />
            </form>
            {response.error && (
                <p
                    style={{
                        color: '#FF3F25',
                        fontSize: '13px',
                    }}
                >
                    {response?.data?.link_to_user}
                </p>
            )}
        </>
    );
};
