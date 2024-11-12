import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

export function TopNav({ link1, link2 }: any) {
  return (
    <View style={styles.navGroup}>
      <TouchableOpacity onPress={() => router.replace(link1)}>
        <Text style={styles.linkText}>{link1}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace(link2)}>
        <Text style={styles.linkText}>{link2}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  linkText: {
    textDecorationLine: "underline",
    color: "yellow",
    margin: 20,
  },
  navGroup: {
    display: "flex",
    flexDirection: "row",
  },
});
