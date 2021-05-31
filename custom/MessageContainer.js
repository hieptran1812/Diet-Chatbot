import React from "react";
import { View } from "react-native";
import { Bubble, MessageText, Day } from "react-native-gifted-chat";
import QuickReplies from "react-native-gifted-chat/lib/QuickReplies";

export const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      containerStyle={{
        left: { marginLeft: 5 },
        right: { marginRight: 2.5 },
      }}
      renderTime={() => <View></View>}
      wrapperStyle={{
        left: {
          borderBottomLeftRadius: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          backgroundColor: "#F4F1DE",
        },
        right: {
          backgroundColor: "#1B4332",
          borderBottomRightRadius: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      }}
    />
  );
};

export const renderMessageText = (props) => (
  <MessageText
    {...props}
    textStyle={{
      left: { color: "#1B4332", padding: 4 },
      right: { color: "#F4F1DE", padding: 4 },
    }}
    customTextStyle={{
      fontSize: 17,
      fontFamily: "Quicksand-Medium",
    }}
  />
);

export const renderDay = (props) => (
  <Day
    {...props}
    textStyle={{
      fontSize: 14,
      fontFamily: "Quicksand-Light",
      color: "black",
    }}
  />
);

export const renderQuickReplies = (props) => (
  <QuickReplies
    {...props}
    color="#1B4332"
    quickReplyStyle={{
      backgroundColor: "#F4F1DE",
      borderWidth: 0,
      borderColor: "#F4F1DE",
      minHeight: 40,
      marginRight: 5,
      maxWidth: "100%",
      paddingHorizontal: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    }}
  />
);
