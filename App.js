import React, { useState } from 'react';
import { View,  Button , Text, Image } from 'react-native';
import { captureImage, selectImageFromGallery } from  './utils/imagePicker';
import { TextRecognition } from '@react-native-ml-kit/text-recognition';

const App = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const handleTextRecognition = async (imagePath) => {
    const result = await TextRecognition.recognize(imagePath);
    setText(result.text);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="h1">React Native ML Kit Example</Text>
      {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
      <Button title="Capture Image" onPress={() => captureImage(setImage)} />
      <Button title="Select Image" onPress={() => selectImageFromGallery(setImage)} />
      <Button title="Recognize Text" onPress={() => handleTextRecognition(image)} disabled={!image} />
      <Text>{text}</Text>
    </View>
  );
};

export default App;
