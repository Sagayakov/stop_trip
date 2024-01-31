import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ReactSelect, { SingleValue } from 'react-select';
import { OptionType, options } from './libr/options';
import { SettingMessengerType } from './libr/types';
import styles from 'widgets/settingMessengers/libr/settingMessengers.module.scss';
import { useState } from 'react';
import { prefixes } from './libr/prefixes';
import { useTranslation } from 'react-i18next';
import './libr/reactSelect.styles.scss';
import { useAddMessengerMutation } from 'app/api/fetchMessengers';

export const AddMessengerForm = () => {
    const [addMessenger, responce] = useAddMessengerMutation();
    const { t } = useTranslation();
    const [prefix, setPrefix] = useState('');
    const [prefixIcon, setPrefixIcon] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const {
        control,
        setValue,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<SettingMessengerType>({
        mode: 'all',
    });

    const handleChange = (selected: SingleValue<OptionType>) => {
        if (selected) {
            setPrefix(prefixes[selected.value as keyof typeof prefixes] || '');
            setPrefixIcon(
                `../../../../src/shared/ui/icons/${selected.value}.png`
            );
            setValue('messenger', selected.value);
        }
    };

    const onsubmit: SubmitHandler<SettingMessengerType> = (data) => {
        console.log(data);
        const { messenger, link_to_user } = data;
        const body = { messenger: 1, link_to_user };
        addMessenger({ body });

        reset();
    };

    return (
        <form
            className={styles.add_messenger_form}
            onSubmit={handleSubmit(onsubmit)}
        >
            <ReactSelect
                name="messenger"
                required
                options={options}
                className={styles.messenger_select_wrapper}
                classNamePrefix="messenger_select"
                onChange={(selected) => handleChange(selected)}
                isMulti={false}
                placeholder={t('my-settings.select-messenger')}
                formatOptionLabel={(option) => (
                    <div className={styles.select_option}>
                        <img src={option.icon} alt={option.label} />
                        <span>{option.label}</span>
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
                rules={{ required: true }}
                render={({ field }) => (
                    <div className={styles.link_wrapper}>
                        <input
                            {...field}
                            type="text"
                            placeholder="@username"
                            className={styles.link_input}
                            onFocus={() => setTooltipVisible(true)}
                            onBlur={() => setTooltipVisible(false)}
                        />
                        {tooltipVisible && (
                            <p className={styles.link_tooltip}>
                                {t('my-settings.correct-link')}
                            </p>
                        )}
                    </div>
                )}
            />
            <input
                type="submit"
                className={styles.submit}
                disabled={!isValid}
                value={t('my-settings.add-messenger')}
            />
        </form>
    );
};
