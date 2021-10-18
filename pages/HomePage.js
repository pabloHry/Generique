import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { Text, Center, Heading, VStack, Box, Image, HStack } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { pickImage } from "../utils/LibraryImagePicker";

export default function HomePage({ navigation }) {
  const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
  const [hasPermissionLibrary, setHasPermissionLibrary] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS == "web") {
        setHasPermissionCamera(false);
        return;
      }
      const { statusCamera } = await Camera.requestPermissionsAsync();
      const { statusLibrary } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermissionCamera(statusCamera === "granted");
      setHasPermissionLibrary(statusLibrary === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // if (hasPermissionCamera === false && hasPermissionLibrary === false) {

  // }
  return (
    <Center px={4} flex={1} bg='blueGray.800'>
      <VStack space={4} alignItems='center'>
        <Heading
          textAlign='center'
          mb='10'
          fontWeight={700}
          color='white'
          fontSize={30}>
          test
        </Heading>
        <Center mt={10}>
          <HStack space={20} alignItems='center'>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Camera");
              }}>
              <Box>
                <Box bg='tomato' p={4} rounded={40}>
                  <AntDesign name='camerao' size={40} color='white' />
                </Box>
                <Text color='white' textAlign='center' mt={3} fontWeight={700}>
                  Camera
                </Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage}>
              <Box>
                <Box bg='blue.300' p={4} rounded={40}>
                  <AntDesign name='picture' size={40} color='white' />
                </Box>
                <Text color='white' textAlign='center' mt={3} fontWeight={700}>
                  Library
                </Text>
              </Box>
            </TouchableOpacity>
          </HStack>
          <Center mt={10}>
            <TouchableOpacity>
              <Text>Access Photos</Text>
            </TouchableOpacity>
          </Center>
        </Center>
      </VStack>
    </Center>
  );
}
