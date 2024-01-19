import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';

export const createFormDataObjectForSendAnnouncement = (data: FormAddAnn, imageFieldName: string) => {
    const formData = new FormData();
    Object.entries(data).forEach(([field, value]) => {
        switch (field) {
            case imageFieldName:
                // Если это поле с новыми изображениями, добавляем каждый файл поочередно
                if (value instanceof Array && value[0] instanceof File) {
                    value.forEach((file, index) => {
                        formData.append(imageFieldName, file, `image_${index}`);
                    });
                }
                break;
            default:
                // Добавляем остальные поля
                if (value === undefined || value === null) {
                    break; //иначе присваивается 'undefined' если поле не заполнено
                }
                if(Array.isArray(value)){
                    value.forEach((val) => formData.append(field, val))
                }
                formData.append(field, value);
                break;
        }
    });
    return formData;
}