import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../SupabaseConfig"; // Import from Supabase configuration

type Message = {
    id: string;
    user_id: string;
    message: string;
  };
  

export default function ChatScreen() {
    const router = useRouter(); // Get the group chat ID from params
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    // Replace with actual authenticated user ID from Supabase Auth
    const userId = "468f6677-ff93-4402-acaf-bc39919e4164"; // TODO: Replace with dynamic user ID
    const groupId = "1e18c7c3-76bf-4656-9e64-e3691ab040fb"; // TODO: Replace with dynamic user ID
    // Fetch Messages from Supabase
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("group_id", groupId)
        .order("created_at", { ascending: true });
  
      if (error) {
        console.error("Error fetching messages:", error);
        setErrorMessage("Failed to load messages.");
      } else {
        setMessages(data as Message[]);
      }
    };

    useEffect(() => {
        fetchMessages();
    }, []);
      
    // Send Message to Supabase
    const sendMessage = async () => {
        try {
            const { data, error } = await supabase.rpc('sendmessage', {
                group_id: groupId,
                user_id: userId,
                message: newMessage
            });

            if (error) {
                console.error("Error sending message:", error);
                setErrorMessage("Failed to send message.");
              } else {
                setNewMessage(""); // Clear input after sending
              }
        }
        catch (error) {
            console.error(error);
            setErrorMessage("Something Scary happened");
        }
    };
  
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Chat</Text>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={item.user_id === userId ? styles.myMessage : styles.otherMessage}>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            )}
            inverted // Makes messages appear bottom-up
          />
    
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  
  // Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f8f8f8",
      padding: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
    },
    errorText: {
      color: "red",
      textAlign: "center",
      marginBottom: 10,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderColor: "#ddd",
    },
    input: {
      flex: 1,
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 20,
      marginRight: 10,
    },
    sendButton: {
      backgroundColor: "#007BFF",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    sendButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    myMessage: {
      alignSelf: "flex-end",
      backgroundColor: "#007BFF",
      padding: 10,
      borderRadius: 10,
      marginBottom: 5,
    },
    otherMessage: {
      alignSelf: "flex-start",
      backgroundColor: "#ddd",
      padding: 10,
      borderRadius: 10,
      marginBottom: 5,
    },
    messageText: {
      color: "#fff",
    },
  });