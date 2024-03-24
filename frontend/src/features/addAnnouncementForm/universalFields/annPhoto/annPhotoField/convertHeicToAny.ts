import heic2any from 'heic2any';

export const convertHeicToAny = async (file: File) => {
    const fileURL = URL.createObjectURL(file);

    const blobRes = await fetch(fileURL);
    const blob = await blobRes.blob();

    const converted = await heic2any({
        blob,
        toType: 'image/jpeg',
        quality: 0.5,
    });

    file = new File([converted as Blob], `image.jpeg`, {
        type: 'image/jpeg',
    });
    URL.revokeObjectURL(fileURL);

    return file;
};
