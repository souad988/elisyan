import React from 'react';
import {Button, View} from 'react-native';
import {loadSavedImage} from './ImageCaptureButtonScripts';

export default function ImagePickButton({setBase64, filebase64Path}) {
  const handleClick = async () => {
    const base64 = await loadSavedImage(filebase64Path);
    setBase64(base64);
  };

  return (
    <View>
      <Button onPress={async () => await handleClick()} title="load saved base64 Photo" />
    </View>
  );
}