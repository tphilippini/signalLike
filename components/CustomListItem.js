import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem>
      <Avatar rounded source={require("../assets/images/default.png")} />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "600" }}>
          My Channel
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          This is test subtitle mon pote ca va ou quoi, oui et toi ? moi je vais
          bien tkt
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
