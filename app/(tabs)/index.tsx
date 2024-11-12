import { Text, StyleSheet, ScrollView, Image, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { TopNav } from "@/components/TopNav";



export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Image
      style={styles.tinyLogo}
      source={require('@/assets/images/CRP-Logo.png')}
    />
    <TopNav link1="Blog" link2="Resources" />
    <Image
      style={styles.blogPhoto}
      source={require('@/assets/images/blog1.png')}
    />
    <Text style={styles.bodyText}>
      The effectiveness of an internship on professional prospects
    </Text>

    <Image
      style={styles.blogPhoto}
      source={require('@/assets/images/blog2.png')}
    />
    <Text style={styles.bodyText}>
      Lorem ipsum dolor uber cash is why you need to take a peek inside the
      industry
    </Text>
  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "grey",
  },
  tinyLogo: {
    width: 100,
    height: 50,
    position: "absolute",
    top: 60,
    alignContent: "center",
  },
  blogPhoto: {
    width: 347,
    height: 151,
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 17,
    marginBottom: 24,
    color: "#fff",
  },
  searchContainer: {
    width: "75%",
    flexDirection: "row", // align items horizontally
    alignItems: "center", // vertically center elements
    marginBottom: 20,
  },
  input: {
    flex: 1, // take up remaining space in the row
    padding: 15,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: "#333",
    height: 60,
    color: "#fff",
    fontSize: 16,
  },
  searchButton: {
    height: 60,
    padding: 15,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
  },
  or: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  locationButton: {
    height: 60,
    width: "75%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200EE",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
