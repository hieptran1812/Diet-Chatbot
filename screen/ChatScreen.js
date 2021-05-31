import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  LogBox,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";

import { GiftedChat } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";
import firebase from "../firebase";
import uuid from "uuid";
import axios from "axios";
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from "../custom/InputToolbar";
import {
  renderBubble,
  renderDay,
  renderMessageText,
  renderQuickReplies,
} from "../custom/MessageContainer";

const recordingOptions = {
  android: {
    extension: ".3gp",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_WB,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_WB,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  ios: {
    extension: ".wav",
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

const messagesRef = firebase.database().ref(`/${uuid()}`);
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default function ChatScreen({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [recording, setRecording] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const deleteRecordingFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI());
      await FileSystem.deleteAsync(info.uri);
    } catch (error) {
      console.log("There was an error deleting recording file", error);
    }
  };

  const getTranscription = async () => {
    setIsFetching(true);
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI());
      // console.log(`FILE INFO: ${JSON.stringify(info)}`);
      const uri = info.uri;
      const formData = new FormData();
      formData.append("file", {
        uri,
        type: "audio/x-wav",
        name: "speech2text",
      });
      const response = await fetch(
        "https://us-central1-chatbot-placeholder.cloudfunctions.net/audioToText",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await response.json();
      const transcript = data.transcript;
      if (transcript) {
        showResponseTextUser(transcript);
        Dialogflow_V2.requestQuery(
          transcript,
          (result) => handleResponse(result),
          (error) => console.log(error)
        );
      } else showResponseText("Mình không nhận diện được giọng nói của bạn!");
    } catch (error) {
      console.log("There was an error reading file", error);
      stopRecording();
      resetRecording();
    }
    setIsFetching(false);
  };

  const startRecording = async () => {
    const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
    if (status !== "granted") return;

    setIsRecording(true);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });
    const recording = new Audio.Recording();

    try {
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
    } catch (error) {
      console.log(error);
      stopRecording();
    }
    setRecording(recording);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
    } catch (error) {}
  };

  const resetRecording = () => {
    deleteRecordingFile();
    setRecording(null);
  };

  const handleOnPressIn = () => {
    startRecording();
  };

  const handleOnPressOut = () => {
    stopRecording();
    getTranscription();
  };

  const {
    name,
    age,
    gender,
    height,
    weight,
    activity,
    bmi,
    bmr,
    classification,
    tdee,
  } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              marginRight: 20,
            }}
            onPress={() => pickImageCamera()}
          >
            <Image source={require("../assets/icon_camera.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginRight: 15,
            }}
            onPress={() => navigation.navigate("Profile", { bmi, bmr, tdee })}
          >
            <Image source={require("../assets/icon_user.png")} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const showResponseText = (text) => {
    let msg = {
      _id: uuid(),
      text,
      createdAt: new Date(),
      user: {
        _id: "2",
        name: "Placeholder",
        avatar: "https://i.imgur.com/Nyp4fGI.png",
      },
    };
    messagesRef.push(JSON.stringify(msg));
  };

  const showResponseImage = (image) => {
    let msg = {
      _id: uuid(),
      createdAt: new Date(),
      user: {
        _id: "2",
        name: "Placeholder",
        avatar: "https://i.imgur.com/Nyp4fGI.png",
      },
      image,
    };
    messagesRef.push(JSON.stringify(msg));
  };

  const showResponseImageUser = (image) => {
    let msg = {
      _id: uuid(),
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "React Native",
        avatar: "https://i.imgur.com/Nyp4fGI.png",
      },
      image,
    };
    messagesRef.push(JSON.stringify(msg));
    setTyping(true);
  };

  const postImageAPI = (image) => {
    showResponseImageUser(image);
    const formData = new FormData();
    formData.append("file", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    });
    axios({
      url: "https://chatbot-placeholder.df.r.appspot.com/predict",
      method: "POST",
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { data } = response;
        const nameFood = data["name"];
        const caloFood = data["calories"];
        if (nameFood != "Error")
          showResponseText(
            `Trong ảnh là món ${nameFood} bạn nha! Trong 100g ${nameFood} có chứa ${caloFood} calories!`
          );
        else
          showResponseText(
            `Sorry bạn :( Mình không đoán được món trong ảnh rùi!`
          );
        setTyping(false);
      })
      .catch(function (error) {
        showResponseText("Sorry bạn :( Ảnh của bạn chưa được gửi đi");
      });
  };

  const pickImageLibary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      postImageAPI(result.uri);
    }
  };

  const pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      postImageAPI(result.uri);
    }
  };

  const showResponseQuickReply = (listBtn) => {
    let msg = {
      _id: uuid(),
      createdAt: new Date(),
      user: {
        _id: "2",
        name: "Placeholder",
        avatar: "https://i.imgur.com/Nyp4fGI.png",
      },
      quickReplies: {
        type: "radio",
        keepIt: true,
        values: listBtn,
      },
    };
    messagesRef.push(JSON.stringify(msg));
  };

  const handleResponse = (result) => {
    let fulfillMessages = result.queryResult.fulfillmentMessages;
    let image, listBtn;
    setTyping(false);
    fulfillMessages.forEach((obj) => {
      if (!obj["platform"]) {
        if (obj["payload"]) {
          if (obj["payload"]["image"]) {
            image = obj["payload"]["image"];
            showResponseImage(image);
          } else if (obj["payload"]["quickReplies"]) {
            listBtn = obj["payload"]["quickReplies"];
            showResponseQuickReply(listBtn);
          }
        }
        if (obj["text"]) {
          let text_bot = obj["text"]["text"][0];
          showResponseText(text_bot);
        }
      }
    });
  };

  const onSend = useCallback((messages = []) => {
    let message_user = messages[0];
    messagesRef.push(JSON.stringify(message_user));
    setTyping(true);
    let text_user = message_user["text"];
    Dialogflow_V2.requestQuery(
      text_user,
      (result) => handleResponse(result),
      (error) => console.log(error)
    );
  }, []);

  const showResponseTextUser = (text) => {
    let msg = {
      _id: uuid(),
      createdAt: new Date(),
      text,
      user: {
        _id: 1,
        name: "React Native",
        avatar: "https://i.imgur.com/Nyp4fGI.png",
      },
    };
    messagesRef.push(JSON.stringify(msg));
    setTyping(true);
  };

  const onQuickReply = (replies = []) => {
    let reply = replies[0];
    let title = reply["title"];
    let value = reply["value"];
    let msg = {
      _id: uuid(),
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "React Native",
        avatar: "https://i.imgur.com/Nyp4fGI.png",
      },
      text: title,
    };
    messagesRef.push(JSON.stringify(msg));
    setTyping(true);
    Dialogflow_V2.requestQuery(
      value,
      (result) => handleResponse(result),
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    Dialogflow_V2.requestEvent(
      "WELCOME",
      {
        ten: name,
        gioi_tinh: gender,
        tuoi: age,
        can_nang: weight,
        chieu_cao: height,
        muc_hoat_dong: activity,
        bmi: bmi,
        bmr: bmr,
        phan_loai: classification,
        tdee: tdee,
      },
      (result) => handleResponse(result),
      (error) => console.log(error)
    );

    const permanentContexts = [
      {
        name: "info",
        parameters: {
          ten: name,
          gioi_tinh: gender,
          tuoi: age,
          can_nang: weight,
          chieu_cao: height,
          muc_hoat_dong: activity,
          bmi: bmi,
          bmr: bmr,
          phan_loai: classification,
          tdee: tdee,
        },
      },
    ];
    Dialogflow_V2.setPermanentContexts(permanentContexts);

    messagesRef.on("value", (snapshot) => {
      var arrMessages = [];
      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();
        arrMessages.unshift(JSON.parse(childData));
      });
      setMessages(arrMessages);
    });
    return () => {
      messagesRef.off("value");
    };
  }, []);

  let [fontsLoaded] = useFonts({
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/background_chat_2.jpg")}
          style={styles.image}
        >
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: 1,
            }}
            onQuickReply={(replies) => onQuickReply(replies)}
            placeholder="Nhấn để trò chuyện ..."
            alwaysShowSend
            scrollToBottom
            renderAvatarOnTop
            minInputToolbarHeight={65}
            renderAvatar={null}
            renderInputToolbar={renderInputToolbar}
            renderActions={renderActions}
            renderComposer={renderComposer}
            renderSend={renderSend}
            renderBubble={renderBubble}
            renderMessageText={renderMessageText}
            renderDay={renderDay}
            renderQuickReplies={renderQuickReplies}
            isTyping={typing}
            onPressActionButton={pickImageLibary}
          />
          <TouchableOpacity
            style={styles.button}
            onPressIn={handleOnPressIn}
            onPressOut={handleOnPressOut}
          >
            {isFetching && <ActivityIndicator color="#ffffff" />}
            {!isFetching && (
              <FontAwesome name="microphone" size={27} color="#F4F1DE" />
            )}
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    position: "relative",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A41B1F",
    alignItems: "center",
    width: 45,
    height: 45,
    borderRadius: 50,
    marginTop: 20,
    position: "absolute",
    bottom: 10,
    left: 55,
  },
});
