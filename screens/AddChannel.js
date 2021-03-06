import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

import { db } from "../config/firebase";

const AddChannel = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create a channel",
      headerBackTitle: "Channels",
    });
  }, [navigation]);

  const createChannel = async () => {
    await db
      .collection("channels")
      .add({
        name: input,
      })
      .then(() => navigation.goBack())
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Input
        placeholder='Channel name'
        autoFocus
        type='text'
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={<Icon name='wechat' type='antdesign' color='gray' />}
      />

      <Button
        disabled={!input}
        onPress={createChannel}
        title='Create new channel'
      />
    </View>
  );
};

export default AddChannel;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 20,
    backgroundColor: "white",
  },
});
