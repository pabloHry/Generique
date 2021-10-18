import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, ImageBackground } from "react-native";
import { Camera } from "expo-camera";
import { Box, Text, Flex } from "native-base";
import { Entypo, EvilIcons, FontAwesome } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";

export default function CameraTakePhoto() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [lastPhotoURI, setLastPhotoURI] = useState(null);
  const [recording, setRecording] = useState(false);
  const [count, setCount] = useState(0);
  const cameraRef = useRef(null);
  let counter = 1;

  const countIncrementation = () => {
    while (counter <= 10) {
      console.log(counter);
      setCount(counter++);
    }
  };

  console.log(count);
  if (lastPhotoURI !== null) {
    return (
      <ImageBackground
        source={{ uri: lastPhotoURI }}
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center",
        }}>
        <TouchableOpacity
          style={{
            flex: 0.2,
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
            marginLeft: 20,
          }}
          onPress={() => {
            setLastPhotoURI(null);
          }}>
          <EvilIcons name='close-o' size={80} color='white' />
        </TouchableOpacity>
      </ImageBackground>
    );
  }
  return (
    <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignSelf: "flex-end",
            alignItems: "start",
            justifyContent: "start",
            padding: 20,
          }}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
          <FontAwesome name='refresh' size={30} color='white' />
        </TouchableOpacity>
        <Flex mb={10}>
          <TouchableOpacity
            style={{
              alignSelf: "start",
              flex: 1,
              marginLeft: 100,
            }}
            onPress={async () => {
              if (cameraRef.current) {
                let photo = await cameraRef.current.takePictureAsync();
                setLastPhotoURI(photo.uri);
                await MediaLibrary.createAssetAsync(photo.uri);
              }
            }}>
            <View
              style={{
                borderWidth: 2,
                borderRadius: 40,
                borderColor: "white",
                height: 65,
                width: 65,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 25,
                  borderColor: "white",
                  height: 50,
                  width: 50,
                  backgroundColor: "white",
                }}></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignSelf: "center", marginLeft: 100 }}
            onPress={async () => {
              if (!recording) {
                setRecording(true);
                let video = await cameraRef.current.recordAsync();
                countIncrementation();
                await MediaLibrary.createAssetAsync(video.uri);
              } else {
                setRecording(false);
                cameraRef.current.stopRecording();
              }
            }}>
            <View
              style={{
                borderWidth: 2,
                borderRadius: 40,
                borderColor: "white",
                height: 65,
                width: 65,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 25,
                  borderColor: "red",
                  height: 50,
                  width: 50,
                  backgroundColor: "red",
                }}></View>
            </View>
          </TouchableOpacity>
          <Text color='white' textAlign='center' fontSize={20}>
            {count}
          </Text>
        </Flex>
      </View>
    </Camera>
  );
}
