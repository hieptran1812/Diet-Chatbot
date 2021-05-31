import React from "react";
import { StyleSheet, View, Image, ImageBackground } from "react-native";
import { Button } from "react-native-elements";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";

export default function WelcomeScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/background_4.jpg")}
        >
          <Image
            source={require("../assets/pho_talk.png")}
            style={styles.logo}
          />
          <Button
            buttonStyle={styles.button}
            title="Khám phá ngay"
            titleStyle={styles.textBtn}
            onPress={() => navigation.navigate("Intro")}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
    paddingTop: "20%",
    paddingBottom: "10%",
    alignItems: "center",
  },

  logo: { width: 141, height: 141, borderRadius: 10 },

  button: {
    backgroundColor: "#9D0208",
    borderRadius: 40,
    width: 270,
    paddingVertical: 15,
  },

  textBtn: {
    fontSize: 22,
    fontFamily: "Quicksand-SemiBold",
  },
});
