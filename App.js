import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';
import {captureImage, selectImageFromGallery} from './utils/imagePicker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import RNMLKitObjectDetection, {
  ObjectDetectorMode,
} from 'rn-mlkit-object-detection';
import {GluestackUIProvider, Icon} from '@gluestack-ui/themed';
import {CameraIcon, FileIcon} from 'lucide-react-native';

const App = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [lastDetectedText, setLastDetectedText] = useState('');
  const [selectedTab, setSelectedTab] = useState('text');
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    if (image) {
      if (selectedTab === 'text') {
        handleTextRecognition(image);
      } else if (selectedTab === 'object') {
        handleObjectDetection(image);
      }
    }
  }, [image, selectedTab]);

  const handleTextRecognition = async imagePath => {
    const result = await TextRecognition.recognize(imagePath);
    setText(result.text);
  };

  const handleObjectDetection = async imagePath => {
    setDetections([]);
    setText('');
    const result = await RNMLKitObjectDetection.detectFromUri(imagePath, {
      detectorMode: ObjectDetectorMode.SINGLE_IMAGE,
      shouldEnableClassification: true,
      shouldEnableMultipleObjects: true,
    });

    console.log('result', result);

    if (result && result.length > 0) {
      setDetections(result);
      setText(`Detected ${result.length} objects`);
    } else {
      setDetections([]);
      setText('No objects detected');
    }
  };

  return (
    <GluestackUIProvider config={{}}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>RNMLKit</Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <Button
            title="Text Recognition"
            onPress={() => setSelectedTab('text')}
            color={selectedTab === 'text' ? 'blue' : '#ccc'}
          />
          <Button
            title="Object Detection"
            onPress={() => setSelectedTab('object')}
            color={selectedTab === 'object' ? 'blue' : '#ccc'}
          />
        </View>

        {/* Image Display */}
        <View style={styles.imageContainer}>
          {image && (
            <Image
              source={{uri: image}}
              style={styles.fullWidthImage}
              resizeMode="cover"
            />
          )}
          {/* Render bounding boxes */}
          {detections.map((detection, index) => (
            <View
              key={index}
              style={{
                position: 'absolute',
                borderColor: 'red',
                borderWidth: 2,
                height: detection.bounding.height,
                width: detection.bounding.width,
                left: detection.bounding.originX,
                top: detection.bounding.originY,
                zIndex: 999,
              }}
            />
          ))}
        </View>

        {/* Text/Object Recognition Result */}
        <View style={styles.recognizedTextContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.recognizedText}>{text}</Text>
          </ScrollView>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => captureImage(setImage)}
            style={styles.iconButton}>
            <Icon as={CameraIcon} fill={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectImageFromGallery(setImage)}
            style={styles.iconButton}>
            <Icon as={FileIcon} fill={'#fff'} />
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  fullWidthImage: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  recognizedTextContainer: {
    height: 100,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
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
