import React from 'react';
import {Button, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {saveBase64ImageToFile} from './ImageCaptureButtonScripts';

export default function ImageCaptureButton({setBase64_file_path}) {
  const handleClick = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      writeTempFile: true,
      includeBase64: true,
    })
      .then(async image => {
        const savedFilePath = await saveBase64ImageToFile(image);
        if (savedFilePath) {
          setBase64_file_path(`${savedFilePath}`);
        }
      })
      .catch(error => {
        console.log('Image Picker Error:', error);
      });
  };

  return (
    <View>
      <Button onPress={async () => await handleClick()} title="Take Photo and save base64" />
    </View>
  );
};

