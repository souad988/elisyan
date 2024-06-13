import React from 'react';
import {Button, View, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default function ImagePickButton({setBase64}) {
  const handleClick = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setBase64(image.data);
    });
  };

  return (
    <View>
      <Button onPress={async () => await handleClick()} title="Pick a Photo" />
    </View>
  );
}