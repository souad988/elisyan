import React from 'react';
import {Button, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {saveImageToFile} from './ImageCaptureButtonScripts';

export default function ImageCaptureButton({setUri}) {
  const handleClick = async () => {
    console.log('clicked');
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      writeTempFile: true,
    })
      .then(async image => {
        const savedFilePath = await saveImageToFile(image);
        if (savedFilePath) {
          setUri(`file://${savedFilePath}`);
        }
      })
      .catch(error => {
        console.log('Image Picker Error:', error);
      });
  };

  return (
    <View>
      <Button onPress={async () => await handleClick()} title="Take a Photo" />
    </View>
  );
};

