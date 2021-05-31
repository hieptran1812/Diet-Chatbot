import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { Picker } from "@react-native-picker/picker";

import RadioForm from "react-native-simple-radio-button";

const radio_props = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
];

const levelActivity = [
  "Ít vận động hoặc không tập thể dục",
  "Vận động nhẹ (1-3 ngày/tuần)",
  "Vận động vừa phải (3-5 ngày/tuần)",
  "Vận động nhiều (6-7 ngày/tuần)",
  "Vận động rất nhiều",
];

var listAge = [];
for (let i = 10; i <= 70; i++) {
  listAge.push(i);
}

export default function CustomerFormScreen({ route, navigation }) {
  const [gender, setGender] = useState("nam");
  const [age, setAge] = useState("20");
  const [weight, setWeight] = useState(50);
  const [height, setHeight] = useState(1.53);
  const [activity, setActivity] = useState(3);

  let [fontsLoaded] = useFonts({
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    const { name } = route.params;
    return (
      <View style={styles.container}>
        <View style={styles.mainForm}>
          <View>
            <Image
              source={require("../assets/standing_human_body.png")}
              style={styles.standingHuman}
            />
          </View>
          <View
            style={{
              width: "50%",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={[styles.textBtn, { fontSize: 18, marginBottom: 8 }]}>
                Giới tính
              </Text>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "white",
                  width: 105,
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: "transparent",
                }}
              >
                <Picker
                  selectedValue={gender}
                  style={{
                    marginLeft: 5,
                    height: 45,
                    width: 100,
                    color: "white",
                    alignItems: "center",
                  }}
                  onValueChange={(itemValue, itemIndex) => {
                    setGender(itemValue);
                  }}
                  mode="dropdown"
                >
                  <Picker.Item label="Nam" value="nam" />
                  <Picker.Item label="Nữ" value="nữ" />
                </Picker>
              </View>
            </View>

            <View>
              <Text
                style={[styles.textBtn, { fontSize: 18, marginVertical: 8 }]}
              >
                Tuổi
              </Text>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "white",
                  width: 105,
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: "transparent",
                }}
              >
                <Picker
                  selectedValue={age}
                  style={{
                    marginLeft: 5,
                    height: 45,
                    width: 100,
                    color: "white",
                    alignItems: "center",
                  }}
                  onValueChange={(itemValue, itemIndex) => {
                    setAge(itemValue);
                  }}
                >
                  {listAge.map((num) => {
                    return (
                      <Picker.Item
                        label={`${num}`}
                        value={`${num}`}
                        key={num}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View>
              <Text style={[styles.textBtn, { fontSize: 18, marginTop: 8 }]}>
                Cân nặng
              </Text>
              <View style={[styles.section, { position: "relative" }]}>
                <Text
                  style={[
                    styles.textBtn,
                    {
                      position: "absolute",
                      right: 10,
                      bottom: 2,
                      fontSize: 20,
                    },
                  ]}
                >
                  Kg
                </Text>
                <TextInput
                  placeholder="50"
                  style={styles.textInput}
                  placeholderTextColor="white"
                  onChangeText={(value) => setWeight(value)}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View>
              <Text style={[styles.textBtn, { fontSize: 20, marginTop: 8 }]}>
                Chiều cao
              </Text>
              <View
                style={[
                  styles.section,
                  { width: "100%", position: "relative" },
                ]}
              >
                <Text
                  style={[
                    styles.textBtn,
                    {
                      position: "absolute",
                      right: 10,
                      bottom: 2,
                      fontSize: 20,
                    },
                  ]}
                >
                  Cm
                </Text>
                <TextInput
                  placeholder="153"
                  style={styles.textInput}
                  placeholderTextColor="white"
                  onChangeText={(value) => setHeight(value / 100)}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
          </View>
        </View>
        <Image source={require("../assets/line.png")} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/running_stick.png")}
            style={styles.runningStick}
          />
          <View>
            <Text style={[styles.textBtn, { fontSize: 25 }]}>
              Thang điểm vận động
            </Text>
            {activity && (
              <Text style={[styles.textBtn, { fontSize: 16 }]}>
                {levelActivity[activity - 1]}
              </Text>
            )}
          </View>
        </View>

        <RadioForm
          radio_props={radio_props}
          initial={2}
          onPress={(value) => {
            setActivity(value);
          }}
          formHorizontal={true}
          labelHorizontal={false}
          buttonColor={"#9D0208"}
          selectedButtonColor={"#9D0208"}
          labelStyle={{
            color: "white",
            fontFamily: "Quicksand-SemiBold",
            fontSize: 26,
            paddingTop: 20,
          }}
          style={{
            width: 275,
            justifyContent: "space-between",
          }}
        />
        <TouchableOpacity
          style={[styles.button, styles.shadowStyle]}
          onPress={() =>
            navigation.navigate("FormComplete", {
              name,
              age,
              gender,
              weight,
              height,
              activity,
            })
          }
        >
          <Text style={[styles.textBtn, , { textAlign: "center" }]}>
            Hoàn thành
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingBottom: 5,
    alignItems: "center",
    marginTop: 8,
    borderColor: "white",
    marginBottom: 10,
    width: "80%",
  },

  textInput: {
    flex: 1,
    fontFamily: "Quicksand-SemiBold",
    fontSize: 40,
    textAlign: "center",
    color: "white",
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: "15%",
    paddingBottom: "10%",
    alignItems: "center",
    backgroundColor: "#A0B2A6",
  },

  mainForm: {
    flexDirection: "row",
    width: 350,
  },

  runningStick: {
    marginRight: 15,
  },

  standingHuman: {
    width: 170,
    height: 400,
  },

  inputContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    borderColor: "white",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#9D0208",
    borderRadius: 30,
    width: 270,
    paddingVertical: 15,
  },

  textBtn: {
    fontSize: 22,
    fontFamily: "Quicksand-SemiBold",
    color: "white",
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
