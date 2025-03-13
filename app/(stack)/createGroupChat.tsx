import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../SupabaseConfig"; // Import from Supabase configuration

export default function CreateGroupChat() {
  const router = useRouter();
  const [groupChatName, setGroupChatName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreation = async () => {

    try {
      const {data, error} = await supabase.rpc('creategroupchat', {
        group_name: groupChatName,
        user_id: "468f6677-ff93-4402-acaf-bc39919e4164",
      });

      if (error) {
        console.error("Error creating group chat:", error);
        setErrorMessage("Failed to create group chat.");
        return;
      }

      console.log("Group Chat Created");
      router.push("./(stack)");
    } catch (error) {
      console.error(error);
      setErrorMessage("Something Scary happened");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Group Chat</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Enter group chat name"
        placeholderTextColor="#999"
        value={groupChatName}
        onChangeText={setGroupChatName}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreation}>
        <Text style={styles.buttonText}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    height: 300,
    width: 450,
    marginBottom: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    color: "#22222",
    marginBottom: 20,
    fontFamily: "Roboto",
    textTransform: "uppercase",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    padding: 2,
    borderRadius: 5,
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 20,
    borderRadius: 999,
    backgroundColor: "#ffff",
    borderWidth: 1,
    borderColor: "grey",
    fontSize: 16,
  },
  button: {
    width: "75%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4682b4",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "#404040",
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
