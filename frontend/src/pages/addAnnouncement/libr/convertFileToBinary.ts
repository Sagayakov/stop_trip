// const fileToBinaryString = (file: File) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = function(event) {
//             resolve(event.target?.result);
//         };
//         reader.onerror = function(error) {
//             reject(error);
//         };
//         reader.readAsBinaryString(file);
//     });
// }
// export const convertFilesToBinaryStrings = async (files: File[]) => {
//     const binaryStrings = [];
//     for (const file of files) {
//         try {
//             const binaryString = await fileToBinaryString(file);
//             binaryStrings.push(binaryString);
//         } catch (error) {
//             console.error('Ошибка при чтении файла:', error);
//         }
//     }
//     return binaryStrings;
// }
const fileToBase64String = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            if (event.target?.result) {
                const result = event.target.result as string;
                const base64String = result.split(',')[1];
                resolve(base64String);
            } else {
                reject(new Error("Ошибка чтения файла"));
            }
        };
        reader.onerror = function(error) {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
};

export const convertFilesToBase64Strings = async (files: File[]) => {
    const base64Strings: string[] = [];
    for (const file of files) {
        try {
            const base64String = await fileToBase64String(file);
            base64Strings.push(base64String as string);
        } catch (error) {
            console.error('Ошибка при чтении файла:', error);
        }
    }
    return base64Strings;
};
