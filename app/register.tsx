import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
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
  
      const myCollection = collection(db, 'users');
      // Define the document reference
      const myDocRef = doc(myCollection, user.user.uid);
      const myDocumentData = {
        firstName: firstName,
        lastName: lastName,
        ethnicity: ethnicity,
        gender: gender,
        major: major
      };

      // Add the document to the collection
      await setDoc(myDocRef, myDocumentData);

      // Log the document ID
      console.log('New document added with ID:', user.user.uid);
      if (user) {
        router.replace("/");
        // Create document in users
      }
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
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

      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.input}
        placeholder="School Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#fff" // White text color
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        placeholderTextColor="#fff" // White text color
      />
      <TextInput
        style={styles.input}
        placeholder="Major"
        value={major}
        onChangeText={setMajor}
        placeholderTextColor="#fff"
      />
      <Text style={styles.label}>Ethnicity</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={ethnicity}
          style={styles.picker}
          onValueChange={(itemValue) => setEthnicity(itemValue)}
        >
          <Picker.Item label="Select Ethnicity" value="" />
          <Picker.Item label="Asian" value="asian" />
          <Picker.Item
            label="Black or African American"
            value="black_or_african_american"
          />
          <Picker.Item label="Hispanic or Latino" value="hispanic_or_latino" />
          <Picker.Item label="White" value="white" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
      <Text style={styles.label}>Gender</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
      <TouchableOpacity onPress={handleBackPress}>
        <Text style={styles.backButton}>Already have an account? Login</Text>
      </TouchableOpacity>
      <Button title="Register" onPress={handleRegister} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#0d47a1", // Dark blue background
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
    color: "yellow",
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    marginTop: 45,
    color: "#fff", // title
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    marginBottom: 12,
    paddingLeft: 8,
    color: "#fff", // White text color for input
    backgroundColor: "#333", // Dark background for inputs for better visibility
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 4,
    marginTop: 12,
    color: "#fff", // White color for labels
  },
  pickerContainer: {
    width: "100%",
    backgroundColor: "#fff", // White background for picker container
    borderRadius: 4,
    marginBottom: 12,
    padding: 0,
    height: 100,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  backArrow: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 1,
  },
  picker: {
    color: "#000", // Black text color for picker
  },
});