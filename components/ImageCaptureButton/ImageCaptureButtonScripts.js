import RNFS from 'react-native-fs';

export const saveImageToFile = async image => {
    const filename = image.path.split('/').pop();
    const imageFileName = `elisyan_${filename}`;
    const directoryPath = `${RNFS.ExternalStorageDirectoryPath}/DCIM/elisyan`;
    console.log('Directory Path:', directoryPath);
    try {
      await RNFS.mkdir(directoryPath);
    } catch (mkdirError) {
      console.log('Directory Creation Error:', mkdirError);
    }
    const filePath = `${directoryPath}/${imageFileName}`;
    try {
      await RNFS.moveFile(image.path, filePath);
      try {
        await RNFS.scanFile(filePath);
            return filePath;
        } catch (scanFileError) {
            return null;
        }
    } catch (moveFileError) {
      return null;
    }
  };