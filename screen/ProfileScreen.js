import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import Modal from "react-native-modal";

export default function ProfileScreen({ navigation, route }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 15,
          }}
          onPress={() => navigation.navigate("Chat")}
        >
          <Image
            source={require("../assets/icon_message.png")}
            style={styles.iconUser}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  let [fontsLoaded] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    const { bmi, bmr, tdee } = route.params;
    return (
      <View style={styles.container}>
        <Modal
          isVisible={isModalVisible}
          animationInTiming={500}
          animationOutTiming={800}
          useNativeDriver={true}
        >
          <View style={styles.modalWrapper}>
            <View style={styles.modal}>
              <Text style={styles.textModal}>
                Bạn có muốn cập nhập lại Khảo sát sức khỏe?
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("CustomerForm")}
              >
                <Text style={styles.textBtn}>Có</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={toggleModal}>
                <Text style={styles.textBtn}>Không</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.body}>
          <View style={styles.columnBox}>
            <TouchableOpacity
              style={[styles.box, styles.colorBox1, styles.shadowStyle]}
              onPress={toggleModal}
            >
              <Text style={[styles.text, { color: "#A41B1F" }]}>BMI</Text>
              <Text style={styles.number}>{bmi}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.box, styles.colorBox2, styles.shadowStyle]}
              onPress={toggleModal}
            >
              <Text style={[styles.text, { color: "#F4F1DE" }]}>BMR</Text>
              <Text style={[styles.number, { color: "#F4F1DE", fontSize: 55 }]}>
                {bmr}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.columnBox}>
            <View style={[styles.box, styles.colorBox2, styles.shadowStyle]}>
              <Image
                source={require("../assets/avatar.png")}
                style={{ borderRadius: 15 }}
              />
            </View>
            <TouchableOpacity
              style={[styles.box, styles.colorBox1, styles.shadowStyle]}
              onPress={toggleModal}
            >
              <Text style={[styles.text, { color: "#A41B1F" }]}>TDEE</Text>
              <Text style={[styles.number, { fontSize: 55 }]}>{tdee}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.header}>
          <View style={[styles.quoteWrapper, styles.shadowStyle]}>
            <View style={{ width: "90%" }}>
              <Text style={styles.quote}>
                “It is health that is real wealth and not pieces of gold and
                silver.”
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B4332",
  },

  body: {
    flex: 3 / 5,
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
  },

  header: {
    flex: 2 / 5,
    justifyContent: "center",
    alignItems: "center",
  },

  quoteWrapper: {
    backgroundColor: "#A0B2A6",
    width: "85%",
    height: "85%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  quote: {
    fontFamily: "Quicksand-Bold",
    textAlign: "center",
    fontSize: 20,
  },

  box: {
    backgroundColor: "white",
    width: 150,
    height: 150,
    margin: 12,
    borderRadius: 20,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  colorBox1: {
    backgroundColor: "#A0B2A6",
  },

  colorBox2: {
    backgroundColor: "#A11015",
  },

  columnBox: {
    marginTop: 40,
    justifyContent: "center",
  },

  text: {
    fontFamily: "Quicksand-SemiBold",
    position: "absolute",
    top: 5,
    left: 10,
    fontSize: 22,
  },

  number: {
    fontFamily: "Quicksand-Bold",
    fontSize: 65,
    color: "#A41B1F",
  },

  iconUser: {
    width: 32,
    height: 32,
  },

  modalWrapper: {
    width: 300,
    height: 370,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  modal: {
    width: "80%",
    height: "80%",
    alignItems: "center",
  },

  textModal: {
    color: "#1B4332",
    fontSize: 28,
    fontFamily: "Quicksand-Bold",
    textAlign: "center",
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#A41B1F",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 15,
    width: 150,
  },

  textBtn: {
    color: "white",
    fontFamily: "Quicksand-Bold",
    fontSize: 25,
    alignSelf: "center",
  },

  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
