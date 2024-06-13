import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import ImageCaptureButton from '../components/ImageCaptureButton/ImageCaptureButton';
import ImagePickButton from '../components/ImageCaptureButton/ImagePickButton';

const ImageCaptureView = () => {
  const [uri, setUri] = useState();
  const [base64, setBase64] = useState();
  const RenderImage = () => {
    return(
      <View>
        <Text>Binary Image</Text>
        {uri ? (
          <Image source={{uri: uri}} style={styles.images} />
        ) : (
          <Image
            source={require('../assets/empty.png')}
            style={styles.images}
          />
        )}
      </View>
    );
  };
  const RenderBase64Image = () => {
    return(
      <View>
        <Text>Base64 Image</Text>
        <View style={styles.iconContainer}>
          {base64 ? (
            <Image
              source={{uri: `data:image/jpeg;base64,${base64}`}}
              style={styles.icon}
            />
          ) : (
            <Image
              source={require('../assets/empty.png')}
              style={styles.images}
            />
          )}
      </View></View>
    );
  }
  return (
    <View>
      <View style={styles.ImageSection}>
        <RenderImage />
        <RenderBase64Image />
      </View>
      <ImageCaptureButton setUri={setUri} />
      <ImagePickButton setBase64={setBase64} />
    </View>
  );
};
export default ImageCaptureView;

const styles = StyleSheet.create({
  ImageSection: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  iconContainer: {
    marginTop: 20,
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderColor: '#f0f0f0',
    borderRadius: 50,
    overflow: 'hidden',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});
