import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";
import { Text } from "native-base";
import CameraPreview from "./CameraPreview";
import CameraOff from "./CameraOff";
import * as MediaLibrary from "expo-media-library";
import styles from "../../utils/stylesHomePageUtils";
import { getFileFromS3, putFileToS3 } from "../../utils/awsUtils";

let camera: Camera;
export default function HomePage() {
  const [startCamera, setStartCamera] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [cameraType, setCameraType] = useState<any>(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState<any>("off");

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  const __takePicture = async () => {
    const photo: any = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };
  const __savePhoto = () => {
    MediaLibrary.createAssetAsync(capturedImage.uri);
    putFileToS3(capturedImage.uri, {
      ContentType: "image/gif, image/png, image/jpeg, image/bmp, image/webp"
    });

    setPreviewVisible(false);
  };
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };
  const __handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };
  const __switchCamera = () => {
    if (cameraType === "back") {
      setCameraType("front");
    } else {
      setCameraType("back");
    }
  };
  return (
    <View style={styles.container}>
      {startCamera ? (
        <View style={styles.startCamera}>
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={__savePhoto}
              retakePicture={__retakePicture}
            />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{ flex: 1 }}
              ref={(r: any) => {
                camera = r;
              }}
            >
              <View style={styles.camera}>
                <View style={styles.flashPosition}>
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={styles.flashStyle}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      ⚡️
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={__switchCamera}
                    style={styles.cameraPosition}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      {cameraType === "front" ? "🤳" : "📷"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.takePicturePosition}>
                  <View style={styles.takePicturePositionButton}>
                    <TouchableOpacity onPress={__takePicture}>
                      <View style={styles.takePictureButton}>
                        <View style={styles.takePictureButtonBorder} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <>
          <CameraOff startCamera={__startCamera} />
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
