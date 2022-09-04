import { Text, Linking, Pressable, StyleSheet } from "react-native";
import React from "react";

const UrlLink = ({ link }) => {
  const handlePress = () => {
    Linking.openURL(link.url);
  };
  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Text style={styles.text}>{link.texto}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "96%",
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 18,
  },
  text: {
    color: "#0000FF",
    fontSize: 20,
    textDecorationLine: "underline",
  },
});

export default UrlLink;
