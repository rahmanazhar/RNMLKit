import React, {useEffect, useState} from 'react';
import {GluestackUIProvider, Icon} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {captureImage, selectImageFromGallery} from './utils/imagePicker';
import {CameraIcon, FileIcon} from 'lucide-react-native';

import TextRecognition from '@react-native-ml-kit/text-recognition';
import RNMLKitObjectDetection, { ObjectDetectorMode } from 'rn-mlkit-object-detection';

const App = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const handleTextRecognition = async imagePath => {
    console.log('Image path:', imagePath);
    const result = await TextRecognition.recognize(imagePath);
    setText(result.text);
    console.log('Recognized text:', result.text);

    for (let block of result.blocks) {
      console.log('Block text:', block.text);
      console.log('Block frame:', block.frame);

      for (let line of block.lines) {
        console.log('Line text:', line.text);
        console.log('Line frame:', line.frame);
      }
    }
  };

  const handleObjectDetection = async imagePath => {
    const result = await RNMLKitObjectDetection.detectFromUri(imagePath);
    console.log('Recognized image:', result);
  }

  useEffect(() => {
    if (image) {
      handleTextRecognition(image);
      handleObjectDetection(image);
    }
  });

  return (
    <GluestackUIProvider config={config}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>RNMLKit</Text>
        </View>

        {/* Image Display */}
        {image && (
          <Image
            source={{uri: image}}
            style={styles.fullWidthImage}
            resizeMode="cover"
          />
        )}

        {/* Text Recognition Result */}
        <Text style={styles.recognizedText}>{text}</Text>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => captureImage(setImage)}
            style={styles.iconButton}>
            <Icon as={CameraIcon} size="sm" fill={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectImageFromGallery(setImage)}
            style={styles.iconButton}>
            <Icon as={FileIcon} size="sm" fill={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fullWidthImage: {
    width: '100%',
    height: 300,
  },
  recognizedText: {
    fontSize: 16,
    color: '#333',
    padding: 10,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    paddingVertical: 10,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default App;
