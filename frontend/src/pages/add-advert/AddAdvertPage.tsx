// import { Controls } from '../../features/controls';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { categories } from '../../shared/const/categories';
import {
    LoadPhotoAlternative,
    LoadPhotoIcon,
    MiniLoadPhoto,
} from '../../shared/ui/icons/loadPhoto';
import './add-advert.scss';
import { ChangeEvent, useState } from 'react';

type FormAddAnn = {
    photo: FileList;
};

export const AddAdvertPage = () => {
    const { category: paramCategory } = useParams();
    const [count, setCount] = useState(0);
    const { register, handleSubmit } = useForm<FormAddAnn>();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            setCount(fileList.length);
        }
    };

    const onsubmit = (data: FormAddAnn) => {
        const photo = data.photo[0];
        console.log(photo);
    };

    return (
        <>
            {/* <Controls /> */}
            <section className="add-ann">
                <form
                    className="add-ann-form"
                    onSubmit={handleSubmit(onsubmit)}
                >
                    <h1>Размещение объявления</h1>
                    <h2>
                        {paramCategory && categories[paramCategory].description}
                    </h2>
                    <div className="ann-field">
                        <h3>
                            Название объявления<span>*</span>:
                        </h3>
                        <input
                            type="text"
                            maxLength={100}
                            placeholder="Название"
                        />
                        <div className="ann-field-err"></div>
                    </div>
                    <div className="ann-field">
                        <h3>
                            Цена<span>*</span>:
                        </h3>
                        <input
                            type="text"
                            id="ann-field-price"
                            placeholder="Цена"
                        />
                        <div className="ann-field-err"></div>
                    </div>
                    <div className="ann-field">
                        <h3>Описание:</h3>
                        <textarea placeholder="Описание" maxLength={1000} />
                        <div className="ann-field-err"></div>
                    </div>
                    <div className="ann-field">
                        <h3>
                            Фото<span>*</span>:
                        </h3>
                        <div className="loadphoto">
                            <label
                                htmlFor="loadphoto"
                                className="loadphoto-btn"
                            >
                                <LoadPhotoIcon />
                                Выберите фотографии
                                <input
                                    id="loadphoto"
                                    type="file"
                                    accept="image/*"
                                    max={10}
                                    onChange={handleFileChange}
                                    {...register('photo')}
                                />
                            </label>
                            <div className="loadphoto-icons">
                                <LoadPhotoAlternative />
                                <LoadPhotoAlternative />
                                <LoadPhotoAlternative />
                                <LoadPhotoAlternative />
                                <LoadPhotoAlternative />
                                <LoadPhotoAlternative />
                            </div>
                            <div className="loadphoto-counter">
                                <div className="loadphoto-counter-wrapper">
                                    <MiniLoadPhoto />
                                    Загружено {count}/10
                                </div>
                            </div>
                        </div>
                        <div className="ann-field-err"></div>
                    </div>
                    <div className="ann-field">
                        <h3>
                            Локация<span>*</span>:
                        </h3>
                        <div className="ann-field-err"></div>
                    </div>
                    <div className="add-ann-form-button">
                        <input type="submit" value="Разместить объявление" />
                        <button className="goBack">Назад</button>
                    </div>
                </form>
            </section>
        </>
    );
};
