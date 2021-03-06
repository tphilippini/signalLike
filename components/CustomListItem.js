import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../config/firebase";

const CustomListItem = ({ id, channelName, enterChannel }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("channels")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapchot) =>
        setMessages(snapchot.docs.map((doc) => doc.data()))
      );

    return unsubscribe;
  });

  return (
    <ListItem
      key={id}
      bottomDivider
      onPress={() => enterChannel(id, channelName)}
    >
      <Avatar
        rounded
        title={channelName[0]}
        source={{
          uri: messages?.[0]?.photoURL,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "600" }}>
          {channelName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          {messages?.[0]?.displayName} : {messages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
