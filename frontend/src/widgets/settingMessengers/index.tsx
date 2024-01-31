import { useTranslation } from 'react-i18next';
import styles from './libr/settingMessengers.module.scss';
import { useAddMessengerMutation } from 'app/api/fetchMessengers';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddMessengerType } from 'app/api/types/messengers';
//import { useGetMessengersQuery } from 'app/api/fetchMessengers';

export const SettingMessengers = () => {
    const { t } = useTranslation();
    //const { data } = useGetMessengersQuery('');
    const [addMessenger, responce] = useAddMessengerMutation();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        reset,
    } = useForm<AddMessengerType>({
        mode: 'all',
    });

    const options = [
        { value: 'tg', label: 'Telegram' },
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'viber', label: 'Viber' },
        { value: 'fb', label: 'FacebookMessenger' },
    ];

    const selectedMessenger = watch('messenger');

    const onsubmit: SubmitHandler<AddMessengerType> = (data) => {
        console.log(data);
        reset();
    };

    return (
        <section className={styles.messengers_wrapper}>
            <p className={styles.messengers_header}>
                {t('my-settings.user-messengers')}
            </p>
            {/* {data && data.results.length && (
                <div className={styles.current_messengers}>
                    
                    <span></span>
                </div>
            )} */}
            <div className={styles.add_messengers_block}>
                <form
                    className={styles.add_messenger_form}
                    onSubmit={handleSubmit(onsubmit)}
                >
                    <div>
                        <p></p>
                        <select
                            {...register('messenger', {
                                required: true,
                            })}
                            defaultValue=""
                            className={styles.messenger_select}
                        >
                            <option value="" disabled>
                                {t('my-settings.select-messenger')}
                            </option>
                            {options.map((el) => (
                                <option key={el.value} value={el.value}>
                                    {el.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        type="text"
                        name="prefix"
                        className={styles.prefix_input}
                        readOnly
                    />
                    <input
                        type="text"
                        name="link_to_user"
                        className={styles.link_input}
                        required
                    />
                    <input
                        type="submit"
                        className={styles.submit}
                        disabled={!isValid}
                        value={t('my-settings.add-messenger')}
                    />
                </form>
            </div>
        </section>
    );
};
