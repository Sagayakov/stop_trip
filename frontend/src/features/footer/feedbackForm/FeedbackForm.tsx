import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Pencil } from '../../../shared/ui/icons/icons-tools/Pencil';
import { getId, handleSubmitFeedback } from './libr/handlers';
import { TypesFeedbackForm } from './libr/typesFeedback';
import { LoadingWithBackground } from '../../../entities/loading/LoadingWithBackground';
import { useState } from 'react';
import { getTokensFromStorage } from '../../../widgets/header/libr/authentication/getTokensFromStorage';

export const FeedbackForm = () => {
    const [loading, setLoating] = useState(false)
    const { accessToken } = getTokensFromStorage()

    const { handleSubmit, control, reset, setValue, formState: { isValid } } =
        useForm<TypesFeedbackForm>();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.currentTarget.value.length >= 900) {
            toast.error(
                'Превышено максимально возможное количество символов в текстом поле!'
            );
        }
    };

    const onFocusGetId = () => getId( import.meta.env.VITE_BASE_URL, setValue);

    const onsubmit: SubmitHandler<TypesFeedbackForm> = async (
        feedbackData: TypesFeedbackForm
    ) => {
        if(accessToken){
            const url = import.meta.env.VITE_BASE_URL;
            setLoating(true)
            setTimeout(() => {
                handleSubmitFeedback(url, feedbackData, reset);
                setLoating(false)
            }, 2000);
        } else {
            toast.error('Для обратной связи, пожалуйста, авторизуйтесь')
        }
    };

    return (
        <div className="feedback">
            <div className="feed">
                <Pencil color="#02C66E" />
                <p>Пожелания по работе сайта</p>
            </div>
            <form onSubmit={handleSubmit(onsubmit)}>
                <Controller
                    name="feedback"
                    control={control}
                    rules={{ minLength: 10, maxLength: 900 }}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            placeholder="Введите текст"
                            minLength={10}
                            maxLength={900}
                            onFocus={onFocusGetId}
                            onChange={(event) => {
                                field.onChange(event.target.value);
                                handleChange(event);
                            }}
                        />
                    )}
                />
                <input type="submit" value="Отправить" disabled={!isValid}  style={{backgroundColor: isValid ? "#02c66e" : "gray"}}/>
            </form>
            {loading && <LoadingWithBackground />}
        </div>
    );
};
