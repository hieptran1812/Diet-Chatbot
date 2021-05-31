import React from "react";
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import { Button } from "react-native-elements";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";

export default function IntroScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "Satisfy-Regular": require("../assets/fonts/Satisfy-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/background_2.jpg")}
        >
          <View style={styles.quote}>
            <Text style={styles.textQuote}>
              “ PHO talk - Your personal eating assistance “
            </Text>
          </View>
          <Button
            buttonStyle={styles.button}
            title="Khám phá ngay"
            titleStyle={styles.textBtn}
            onPress={() => navigation.navigate("Signup")}
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
    justifyContent: "flex-end",
    paddingTop: "20%",
    paddingBottom: "10%",
    alignItems: "center",
  },

  quote: {
    flex: 2 / 3,
    justifyContent: "center",
  },

  textQuote: {
    fontFamily: "Satisfy-Regular",
    fontSize: 45,
    textAlign: "center",
    color: "#9D0208",
  },

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
