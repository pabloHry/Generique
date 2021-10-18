// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import theme from "./theme/theme";
import HomePage from "./pages/HomePage";
import CameraTakePhoto from "./pages/CameraTakePhoto";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NativeBaseProvider theme={theme} resetCss>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={HomePage} />
          <Stack.Screen name='Camera' component={CameraTakePhoto} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
