import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
  const [image, setImage] = useState(null);
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