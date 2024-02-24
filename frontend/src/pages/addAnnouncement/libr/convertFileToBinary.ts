const fileToBinaryString = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            resolve(event.target?.result);
        };
        reader.onerror = function(error) {
            reject(error);
        };
        reader.readAsBinaryString(file);
    });
}

export const convertFilesToBinaryStrings = async (files: File[]) => {
    const binaryStrings = [];
    for (const file of files) {
        try {
            const binaryString = await fileToBinaryString(file);
            binaryStrings.push(binaryString);
        } catch (error) {
            console.error('Ошибка при чтении файла:', error);
        }
    }
    return binaryStrings;
}