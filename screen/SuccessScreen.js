import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";

export default function SuccessScreen({ route, navigation }) {
  var listNumber = [];
  for (var i = 10; i <= 70; i++) {
    listNumber.push(i);
  }

  let [fontsLoaded] = useFonts({
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    const { name } = route.params;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/background_3.jpg")}
        >
          <View style={styles.box}>
            <Image
              source={require("../assets/pho_talk.png")}
              style={styles.logo}
            />
            <View>
              <Text style={styles.textTitleBox}>Chào mừng bạn</Text>
              <Text style={styles.textSubtitleBox}>hãy bắt đầu nào !</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.shadowStyle]}
              onPress={() => navigation.navigate("CustomerForm", { name })}
            >
              <Text style={styles.textBtn}>Khảo sát sức khỏe</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "transparent",
              borderRadius: 15,
              borderColor: "white",
              borderWidth: 2,
            }}
          ></View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    position: "absolute",
    top: -75,
    width: 141,
    height: 141,
    borderRadius: 10,
  },

  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    paddingTop: "20%",
    paddingBottom: "10%",
    alignItems: "center",
    paddingHorizontal: "7%",
  },

  button: {
    backgroundColor: "#9D0208",
    borderRadius: 30,
    width: 270,
    paddingVertical: 15,
    marginVertical: 55,
  },

  textBtn: {
    fontSize: 22,
    fontFamily: "Quicksand-SemiBold",
    color: "white",
    textAlign: "center",
  },

  box: {
    backgroundColor: "#84A59D",
    width: "100%",
    height: "50%",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
    borderRadius: 10,
  },

  textTitleBox: {
    fontSize: 35,
    color: "#F4F1DE",
    fontFamily: "Quicksand-SemiBold",
    textAlign: "center",
  },

  textSubtitleBox: {
    fontSize: 23,
    color: "#F4F1DE",
    fontFamily: "Quicksand-SemiBold",
    textAlign: "center",
  },

  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
