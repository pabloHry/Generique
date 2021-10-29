import React from "react";
import { View, TouchableOpacity, ImageBackground } from "react-native";
import { Text } from "native-base";
import { Video } from "expo-av";

const CameraPreview = ({
  photo,
  retakePicture,
  savePhoto,
  video,
  saveVideo
}: any) => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%"
      }}
    >
      {photo != null ? (
        <ImageBackground
          source={
            photo != null
              ? { uri: photo && photo.uri }
              : { uri: video && video.uri }
          }
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
                onPress={photo != null ? savePhoto : saveVideo}
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
                  {photo != null ? "save photo" : "save video"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <>
          <Video
            style={{ alignSelf: "center", width: "100%", height: "90%" }}
            source={{
              uri: video && video.uri
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
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
                onPress={saveVideo}
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
                  save video
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CameraPreview;
