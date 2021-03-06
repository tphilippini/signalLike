import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

import * as firebase from "firebase";
import { db, auth } from "../config/firebase";

const Channel = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerStyle: { backgroundColor: "#FFF" },
      headerTitleStyle: { color: "#000" },
      headerTintColor: "#000",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar rounded source={require("../assets/images/default.png")} />
          <Text style={styles.title}>{route.params.name}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name='arrowleft' size={24} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <FontAwesome name='video-camera' size={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='call' size={24} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("channels").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("channels")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapchot) =>
        setMessages(
          snapchot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.wrapper}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      position='absolute'
                      rounded
                      // WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      position='absolute'
                      rounded
                      // WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5,
                      }}
                      bottom={-15}
                      left={-5}
                      size={30}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder='Type your message'
                style={styles.textInput}
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons name='send' size={24} color='#2B68E6' />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Channel;

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
    fontWeight: "700",
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginRight: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  wrapper: {
    flex: 1,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});
