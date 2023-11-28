import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { LoadPhotoIcon, LoadPhotoAlternative, MiniLoadPhoto } from '../../../shared/ui/icons/loadPhoto';
import { useState } from 'react';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementPhotoField = ({ register }: Props) => {
    const [count, setCount] = useState(0);
    return (
        <div className="ann-field">
            <h3>
                Фото<span>*</span>:
            </h3>
            <div className="loadphoto">
                <div className="loadphoto-btn">
                    <LoadPhotoIcon />
                    Выберите фотографии
                    <input
                        className="loadphoto-btn-hidden"
                        type="file"
                        accept="image/*"
                        multiple={true}
                        max={10}
                        {...register('announcementPhoto')}
                    />
                </div>
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
    );
};
