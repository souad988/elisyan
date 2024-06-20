import { TextBase } from 'react-native';
import RNFS from 'react-native-fs';

export const saveImageToFile = async image => {
    const filename = image.path.split('/').pop();
    const imageFileName = `elisyan_${filename}`;
    const directoryPath = `${RNFS.ExternalStorageDirectoryPath}/DCIM/elisyan`;
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

export const saveBase64ImageToFile = async (image) => {
    const filename = image.path.split('/').pop().split('.')[0];
    const filePath = `${RNFS.DocumentDirectoryPath}/${filename}.txt`;
    try {
      await RNFS.writeFile(filePath, image.data, 'base64');
      return filePath;
    } catch (error) {
      console.log('Error saving image:', error);
      return null;
    }
};
  
export const loadSavedImage = async (IMAGE_FILE_PATH) => {
    try {
      const base64String = await RNFS.readFile(IMAGE_FILE_PATH, 'base64');
      return base64String;
    } catch (error) {
      return null;
    }
};