import { StyleSheet } from "react-native";

const stylesHomePage = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37474F",
    alignItems: "center",
    justifyContent: "center"
  },
  startCamera: {
    flex: 1,
    width: "100%"
  },
  camera: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row"
  },
  cameraPosition: {
    marginTop: 20,
    borderRadius: 50,
    height: 25,
    width: 25
  },
  flashStyle: {
    borderRadius: 50,
    height: 25,
    width: 25
  },
  flashPosition: {
    position: "absolute",
    left: "5%",
    top: "10%",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  takePicturePosition: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-between"
  },
  takePicturePositionButton: {
    alignSelf: "center",
    flex: 1,
    alignItems: "center"
  },
  takePictureButton: {
    borderWidth: 2,
    borderRadius: 40,
    borderColor: "white",
    height: 65,
    width: 65,
    justifyContent: "center",
    alignItems: "center"
  },
  takePictureButtonBorder: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "white",
    height: 50,
    width: 50,
    backgroundColor: "white"
  }
});

export default stylesHomePage;
