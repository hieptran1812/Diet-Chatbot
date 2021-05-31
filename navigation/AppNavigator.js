import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import ChatStackNavigator from "./ChatStackNavigator";
import { dialogflowConfig } from "../dialogflow";
import { Dialogflow_V2 } from "react-native-dialogflow";

export default function AppNavigator() {
  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }, []);
  return (
    <NavigationContainer>
      <ChatStackNavigator />
    </NavigationContainer>
  );
}
