import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  TouchableOpacity,
} from "react-native";
import { Box, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";

const CameraOff = ({ startCamera }: any) => (
  <>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text color="white" mb={20} fontWeight={700} fontSize={20}>
        Test Build expo
      </Text>
      <TouchableOpacity onPress={startCamera}>
        <Box>
          <Box bg="tomato" p={10} rounded={40}>
            <AntDesign name="camerao" size={100} color="white" />
          </Box>
          <Text
            color="white"
            textAlign="center"
            mt={3}
            fontWeight={700}
            fontSize={25}
          >
            Camera
          </Text>
        </Box>
      </TouchableOpacity>
    </View>
    <StatusBar style="auto" />
  </>
);

export default CameraOff