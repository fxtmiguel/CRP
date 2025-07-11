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
    created_at: string;
    users: {
      name: string;
    };
  };
  

export default function ChatScreen() {
    const router = useRouter(); // Get the group chat ID from params
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [groupName, setGroupName] = useState("");
  
    const userId = "1afb0249-3839-4e70-995c-1b4f0aa8596f"; // TODO: Replace with dynamic user ID
    const groupId = "1ddfd19e-0bb1-4708-aab1-6249bbcc467c"; // TODO: Replace with dynamic user ID
    const fetchGroupName = async() => {
      const {data, error} = await supabase
        .from("groups")
        .select("name")
        .eq("id", groupId)
        .single();
      
      if (error) {
        console.error("Error fetching group name:", error);
        setGroupName("Please alert staff");
      }
      else if (data) {
        setGroupName(data.name);
      }
    }
    
    // Fetch Messages from Supabase
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        //users(name) basically joins the users and messages tables so we can get the student name
        .select("id, message, created_at, user_id, users(name)")
        .eq("group_id", groupId)
        .order("created_at", { ascending: false });
  
      if (error) {
        console.error("Error fetching messages:", error);
        setErrorMessage("Failed to load messages.");
        console.error("Supabase fetch error:", error?.message || error);

      } else if (data) {
        setMessages(data as Message[]);
      }
    };

    useEffect(() => {
        fetchMessages();
        fetchGroupName();
    }, []);
      
    // Send Message to Supabase
    const sendMessage = async () => {
        try {
            const { data, error } = await supabase
              .from('messages')
              .insert([
                {
                  group_id: groupId,
                  user_id: userId,
                  message: newMessage,
                }
              ]
            );

            if (error) {
                console.error("Error sending message:", error);
                setErrorMessage("Failed to send message.");
              } else {
                fetchMessages();
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
          <Text style={styles.title}>{groupName}</Text>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {           
              const isMe = item.user_id == userId   
              const time = new Date(item.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              return(
                <View style={isMe ? styles.myMessage : styles.otherMessage}>
                  <Text style={styles.senderName}>{item.users.name}</Text>
                  <Text style={styles.timestamp}>{time}</Text>
                  <Text style={styles.messageText}>{item.message}</Text>
                </View>
              );
            }}
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
      backgroundColor: "#121212",
      padding: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
      color: "#fff"
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
      backgroundColor: "#1a1a1a",
      borderTopWidth: 1,
      borderColor: "#333",
    },
    input: {
      flex: 1,
      padding: 10,
      borderWidth: 1,
      borderRadius: 20,
      marginRight: 10,
      backgroundColor: "#2a2a2a",
      color: "#fff",
      borderColor: "#444"
    },
    sendButton: {
      backgroundColor: "#4a90e2",
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
      backgroundColor: "#005FF9",
      padding: 10,
      borderRadius: 10,
      marginBottom: 5,
    },
    otherMessage: {
      alignSelf: "flex-start",
      backgroundColor: "#2C2C2E",
      padding: 10,
      borderRadius: 10,
      marginBottom: 5,
    },
    messageText: {
      color: "#FFFFFF",
    },
    senderName: {
      fontSize: 12,
      color: "#BBBBBB",
      marginBottom: 2,
      alignSelf: "flex-start",
    },
    timestamp: {
      fontSize: 10,
      color: "#BBBBBB",
      alignSelf: "flex-start",
    },
  });