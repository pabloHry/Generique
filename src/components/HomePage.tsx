import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";
import { Text, Switch } from "native-base";
import CameraPreview from "./CameraPreview";
import CameraOff from "./CameraOff";
import styles from "../../utils/stylesHomePageUtils";
import { putFileToS3 } from "../../utils/awsUtils";
import { nameOfObject } from "../../utils/nameOfObject";
import * as MediaLibrary from "expo-media-library";
let camera: Camera;

export default function HomePage() {
  const [startCamera, setStartCamera] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [capturedVideo, setCapturedVideo] = useState<any>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const [switchOff, setSwitchOff] = useState<boolean>(false);
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
  const __switchRecord = () => {
    if (switchOff === false) {
      setSwitchOff(true);
    } else {
      setSwitchOff(false);
    }
  };
  const __takePicture = async () => {
    const photo: any = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };
  const __takeRecord = async () => {
    if (!recording) {
      setRecording(true);
      let video = await camera.recordAsync();
      setCapturedVideo(video);
    } else {
      setRecording(false);
      camera.stopRecording();
      setPreviewVisible(true);
    }
  };
  const __saveVideo = async () => {
    await putFileToS3(nameOfObject(capturedVideo.uri), capturedVideo.uri, {
      ContentType: "multipart/form-data"
    });
    setPreviewVisible(false);
    await setCapturedVideo(null);
  };
  const __savePhoto = async () => {
    await MediaLibrary.createAssetAsync(capturedImage.uri);
    setPreviewVisible(false);
    await setCapturedImage(null);
  };
  const __retakePicture = () => {
    setCapturedImage(null);
    setCapturedVideo(null);
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
          {previewVisible || capturedVideo || capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              video={capturedVideo}
              saveVideo={__saveVideo}
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
                <Switch onChange={__switchRecord} />
                <View
                  style={
                    switchOff
                      ? styles.takeRecordPosition
                      : styles.takePicturePosition
                  }
                >
                  <View
                    style={
                      switchOff
                        ? styles.takeRecordPositionButton
                        : styles.takePicturePositionButton
                    }
                  >
                    <Text color="white" fontWeight={700} mb={2}>
                      {switchOff ? "RECORD" : "PHOTO"}
                    </Text>
                    <TouchableOpacity
                      onPress={switchOff ? __takeRecord : __takePicture}
                    >
                      <View
                        style={
                          switchOff
                            ? styles.takeRecordButton
                            : styles.takePictureButton
                        }
                      >
                        <View
                          style={
                            switchOff
                              ? styles.takeRecordButtonBorder
                              : styles.takePictureButtonBorder
                          }
                        />
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
