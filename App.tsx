/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [imageUri, setImageUri] = useState();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    console.log('imageUri', imageUri);
  }, [imageUri])
  
  const handleClick = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      writeTempFile: true,
      //includeBase64: true, // Include base64 in the response
    })
      .then(async image => {
        console.log(image);
        filename = image.path.split('/').pop()
        const imageFileName = `elisyan_${filename}`;

        const directoryPath = `${RNFS.ExternalStorageDirectoryPath}/DCIM/elisyan`;
        console.log('directory ',directoryPath);
        await RNFS.mkdir(directoryPath);
        const filePath = `${directoryPath}/${imageFileName}`;
        console.log('filePath ',filePath);
        // Move the image file to the new location
        await RNFS.moveFile(image.path, filePath);
        //setSavedImagePath(filePath);
        setImageUri(`file:/${filePath}`);
        /** 
        RNFS.scanFile([{ path: filePath, mime: 'image/jpg' }])
          .then(() => console.log('scan file success'))
          .catch(err => console.log('scan file error:', err));
        */
        
      })
      .catch(error => {
        console.log(error);
  });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="See Your Changes">
            {
              imageUri? <View style={{flex: 1}}><Image
            source={{ uri:imageUri }}
            contentFit="contain"
            style={{ width: 300, aspectRatio: 1 , borderColor: 'black', borderWidth: 1}}
          /></View>:null
            }
          </Section>
          <Section title=''>
            <Button onPress={() => handleClick()} title="take a photo" />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
