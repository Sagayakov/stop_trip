import heic2any from 'heic2any';

export const convertHeicToAny = async (file: File): Promise<File | null> => {
    const arr = new Uint8Array(await file.arrayBuffer()).subarray(0, 4);
    let header = '';
    for (let i = 0; i < arr.length; i++) {
      header += arr[i].toString(16);
    }

    let type = '';
    switch (header) {
      case '89504e47':
        type = 'image/png';
        break;
      case '47494638':
        type = 'image/gif';
        break;
      case 'ffd8ffe0':
      case 'ffd8ffe1':
      case 'ffd8ffe2':
      case 'ffd8ffe3':
      case 'ffd8ffe8':
        type = 'image/jpeg';
        break;
      default:
        type = '';
    }

    const nameArr = file.name.split('.');
    const newNamePng = `${nameArr.slice(0, -1).join('')}${Date.now()}.png`;
    const newNameJpeg = `${nameArr.slice(0, -1).join('')}${Date.now()}.jpeg`;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uniqueBlob = new Blob([arrayBuffer], { type: file.type });
      let pngBlob = await heic2any({
        blob: uniqueBlob,
        toType: 'image/png',
      });

      if (Array.isArray(pngBlob)) {
        // eslint-disable-next-line prefer-destructuring
        pngBlob = pngBlob[0];
      }

      const pngFile = new File(
        [pngBlob],
        newNamePng,
        { type: 'image/png' },
      );

      return pngFile;
    } catch (error: unknown) {
      if ((error as { message: string }).message === `ERR_USER Image is already browser readable: ${type}`) {
        return new File(
          [await file.arrayBuffer()],
          newNameJpeg,
          { type },
        );
      }
      console.log('Произошла ошибка при конвертации:', error);
      return null;
    }
};
