import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { router } from "expo-router";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [gender, setGender] = useState("");

  const handleRegister = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      const myCollection = collection(db, "users");
      const myDocRef = doc(myCollection, user.user.uid);
      const myDocumentData = {
        firstName: firstName,
        lastName: lastName,
        ethnicity: ethnicity,
        gender: gender,
        major: major,
      };

      await setDoc(myDocRef, myDocumentData);

      console.log("New document added with ID:", user.user.uid);
      if (user) {
        router.replace("/login");
      }
    } catch (error: any) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    }
  };

  const handleBackPress = () => {
    router.replace("/login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backArrow}>
        <Icon name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <Image source={require("@/assets/images/CRPtrans.png")} style={styles.logo} />
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="School Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Major"
        value={major}
        onChangeText={setMajor}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Ethnicity</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Ethnicity"
        value={ethnicity}
        onChangeText={setEthnicity}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Gender"
        value={gender}
        onChangeText={setGender}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity onPress={handleBackPress}>
        <Text style={styles.backButton}>Already have an account? Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  backArrow: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 1,
  },
  logo: {
    height: 200,
    width: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
    width: "90%",
    marginBottom: 16,
    paddingLeft: 12,
    color: "#333",
    backgroundColor: "#f1f1f1",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 4,
    marginLeft: 16,
    color: "#333",
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  registerButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginTop: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
