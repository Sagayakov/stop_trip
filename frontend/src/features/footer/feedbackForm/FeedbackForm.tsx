import { toast } from 'react-toastify';
import { Pencil } from '../../../shared/ui/icons/icons-tools/Pencil'

export const FeedbackForm = () => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.currentTarget.value.length >= 300) {
            toast.error(
                'Превышено максимально возможное количество символов в текстом поле!'
            );
        }
    };

    return (
        <div className="feedback">
            <div className='feed'>
                <Pencil color="#02C66E" />
                <p>Пожелания по работе сайта</p>
            </div>
            <form>
                <textarea placeholder="Введите текст" maxLength={300} onChange={handleChange}/>
                <input type="submit" value="Отправить"/>
            </form>
        </div>
    )
}
