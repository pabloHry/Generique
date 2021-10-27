import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import theme from "./theme/theme";
import HomePage from "./src/components/HomePage";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
