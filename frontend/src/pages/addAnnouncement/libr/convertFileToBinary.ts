import heic2any from 'heic2any';

const fileToBase64String = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async function (event) {
            if (event.target?.result) {
                const result = event.target.result as string;
                const base64String = result.split(',')[1];
                resolve(base64String);
            } else {
                reject(new Error('Ошибка чтения файла'));
            }
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
};

export const convertFilesToBase64Strings = async (files: File[] | FileList) => {
    const base64Strings: string[] = [];
    for (const file of files) {
        try {
            if (
                file.name.toLowerCase().includes('.heic') ||
                file.name.toLowerCase().includes('.heif')
            ) {
                const blobURL = URL.createObjectURL(file);
                const blobRes = await fetch(blobURL);
                const blob = await blobRes.blob();
                const converted = await heic2any({
                    blob,
                    toType: 'image/jpeg',
                    quality: 0.5,
                });
                const convertedFile = new File(
                    [converted as Blob],
                    'image.jpeg'
                );
                const base64String = await fileToBase64String(convertedFile);
                base64Strings.push(base64String as string);
            } else {
                const base64String = await fileToBase64String(file);
                base64Strings.push(base64String as string);
            }
        } catch (error) {
            console.error('Ошибка при чтении файла:', error);
        }
    }
    return base64Strings;
};
