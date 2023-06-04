import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import chk from '../assets/chk.png';
import rotate from '../assets/rotate.png';

const CA = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      savePhoto(photo.uri);
    }
  };

  const savePhoto = async (photoUri) => {
    if (Platform.OS === 'android') {
      const asset = await MediaLibrary.createAssetAsync(photoUri);
      await MediaLibrary.createAlbumAsync('Expo', asset, false);
    } else {
      await MediaLibrary.saveToLibraryAsync(photoUri);
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
          <Image style={{ width: 30, height: 30 }} source={rotate} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Image style={{ width: 50, height: 50 }} source={chk} />
        </TouchableOpacity>
      </Camera>
      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.previewImage} />
      )}
    </View> // 찍은 사진 출력
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40, // 모바일 상단에 맞추다보나 패딩 좀 증가 시킴.
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  flipButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'yellow',
    padding: 15,
    borderRadius: 10,
  },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    padding: 30,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default CA;
