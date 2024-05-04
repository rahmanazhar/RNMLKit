import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const captureImage = async (setImage) => {
  const result = await launchCamera({ mediaType: 'photo' });
  if (result.assets) {
    setImage(result.assets[0].uri);
  }
};

export const selectImageFromGallery = async (setImage) => {
  const result = await launchImageLibrary({ mediaType: 'photo' });
  if (result.assets) {
    setImage(result.assets[0].uri);
  }
};
