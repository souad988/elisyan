/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  View,
} from 'react-native';
import ImageCaptureView from './views/ImageCaptureView';

function App(): React.JSX.Element {
  return (
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
          <ImageCaptureView />
        </View>
  );
}

export default App;
