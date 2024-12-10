# RNMLKit

A React Native application demonstrating the integration of ML Kit features for text recognition and object detection. This app provides a simple interface to capture or select images and perform machine learning tasks using Google's ML Kit.

## Features

- **Text Recognition**: Extract text from images using ML Kit's text recognition API
- **Object Detection**: Detect and classify objects in images with bounding boxes
- **Image Input Options**:
  - Capture images using device camera
  - Select images from device gallery
- **Modern UI**: Built with GluestackUI components
- **Real-time Processing**: Immediate results display after image selection

## Requirements

- Node.js >= 18
- React Native 0.74.0
- iOS or Android development environment set up
- Camera permissions for image capture
- Photo library permissions for image selection

## Installation

1. Clone the repository:
```bash
git clone https://github.com/rahmanazhar/RNMLKit.git
cd RNMLKit
```

2. Install dependencies:
```bash
yarn install
```

3. Install iOS dependencies (iOS only):
```bash
cd ios
pod install
cd ..
```

## Running the Application

### Development

Start the Metro bundler:
```bash
yarn start
```

### iOS

```bash
yarn ios
```

### Android

#### Debug Mode
```bash
yarn android
```

#### Release Mode
```bash
react-native run-android --mode=release
```

## Project Structure

- `/android` - Android native code
- `/ios` - iOS native code
- `/utils` - Utility functions for image picking
- `App.js` - Main application component

## Dependencies

Key dependencies include:
- @react-native-ml-kit/text-recognition: Text recognition functionality
- rn-mlkit-object-detection: Object detection capabilities
- @gluestack-ui/themed: UI components
- react-native-image-picker: Image selection functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Google ML Kit for providing the machine learning capabilities
- React Native community for the excellent tooling and support
- GluestackUI for the modern UI components
