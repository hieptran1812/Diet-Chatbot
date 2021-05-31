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
import {
  bmiCalculator,
  bmiClassify,
  bmrCalculator,
  tdeeCalculator,
} from "../utils/calculator";

export default function FormCompleteScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    const { name, age, gender, height, weight, activity } = route.params;
    const bmi = bmiCalculator(weight, height);
    const bmr = bmrCalculator(weight, height, gender, age);
    const classification = bmiClassify(bmi);
    const tdee = tdeeCalculator(bmr, activity);

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/background_5.png")}
        >
          <View style={styles.box}>
            <Image
              source={require("../assets/pho_talk.png")}
              style={styles.logo}
            />
            <View>
              <Text style={styles.textSubtitleBox}>
                Cảm ơn bạn đã hoàn thành khảo sát !
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.shadowStyle]}
              onPress={() =>
                navigation.navigate("Chat", {
                  name,
                  age,
                  gender,
                  weight,
                  height,
                  activity,
                  bmi,
                  bmr,
                  classification,
                  tdee,
                })
              }
            >
              <Text style={[styles.textBtn, , { textAlign: "center" }]}>
                Bắt đầu hành trình
              </Text>
            </TouchableOpacity>
          </View>
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
