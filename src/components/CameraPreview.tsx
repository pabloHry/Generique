import React from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Box, Text } from "native-base";

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%"
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 15,
            justifyContent: "flex-end"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,
                alignItems: "center",
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CameraPreview