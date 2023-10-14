import { Pencil } from '../../../shared/ui/icons/icons-tools/Pencil'

export const FeedbackForm = () => {
    return (
        <div className="feedback">
            <div className='feed'>
                <Pencil color="#02C66E" />
                <p>Пожелания по работе сайта</p>
            </div>
            <form>
                <input type="text" placeholder="Введите текст" />
                <input type="submit" value="Отправить"/>
            </form>
        </div>
    )
}
