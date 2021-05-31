import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Button, Icon } from "react-native-elements";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import MeterialIcons from "react-native-vector-icons/MaterialIcons";

export default function SignupScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  });

  const [name, setName] = useState("");

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Tạo tài khoản,</Text>
          <Text style={styles.subtitle}>Bắt đầu hành trình!</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.section}>
            <MeterialIcons name="person" size={25} />
            <TextInput
              placeholder="Họ và tên"
              style={styles.textInput}
              onChangeText={(name) => setName(name)}
            />
          </View>
          <View style={styles.section}>
            <MeterialIcons name="email" size={25} />
            <TextInput placeholder="Email" style={styles.textInput} />
          </View>
          <View style={styles.section}>
            <MeterialIcons name="lock-outline" size={25} />
            <TextInput
              placeholder="Mật khẩu"
              style={styles.textInput}
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.groupBtn}>
          <Button
            buttonStyle={[styles.button, styles.shadowStyle]}
            title="Đăng ký"
            titleStyle={styles.textBtn}
            onPress={() =>
              navigation.navigate("Success", {
                name,
              })
            }
          />
          <Button
            buttonStyle={[styles.button, styles.btnFb, styles.shadowStyle]}
            title="Liên kết với Facebook"
            titleStyle={[styles.textBtn, styles.textFb]}
            icon={
              <Icon
                name="facebook-square"
                type="font-awesome"
                color="#4267B2"
                paddingRight={10}
              />
            }
          />
        </View>

        <View>
          <Text
            style={[styles.textBtn, styles.textFb, { textAlign: "center" }]}
          >
            Bạn đã có tài khoản?{" "}
            <Text style={{ color: "#9D0208" }}>Đăng nhập ngay!</Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    fontFamily: "Quicksand-SemiBold",
    backgroundColor: "white",
  },

  inputContainer: {
    width: 300,
    marginBottom: 10,
    borderRadius: 10,
  },

  title: {
    fontSize: 35,
    fontFamily: "Quicksand-SemiBold",
  },

  subtitle: {
    fontFamily: "Quicksand-SemiBold",
    color: "#787878",
    fontSize: 25,
  },

  header: {
    marginBottom: 80,
  },

  form: {
    marginBottom: 20,
  },

  icon: {
    paddingRight: 15,
  },

  section: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    borderColor: "#AEABAB",
    marginBottom: 10,
  },

  textInput: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: "Quicksand-SemiBold",
    fontSize: 18,
  },

  groupBtn: {
    marginBottom: 50,
  },

  button: {
    backgroundColor: "#9D0208",
    borderRadius: 15,
    height: 55,
    marginBottom: 20,
  },

  btnFb: {
    backgroundColor: "#E5E5E5",
  },
  textFb: {
    color: "#4267B2",
    fontSize: 18,
  },

  textBtn: {
    fontSize: 22,
    fontFamily: "Quicksand-SemiBold",
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
