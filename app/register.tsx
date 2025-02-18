import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
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
  const [ethnicity, setEthnicity] = useState(null);
  const [gender, setGender] = useState(null);
  const [ethnicityOpen, setEthnicityOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [ethnicityItems, setEthnicityItems] = useState([
    { label: "Asian", value: "Asian" },
    { label: "Black or African American", value: "Black" },
    { label: "Hispanic or Latino", value: "Hispanic" },
    { label: "White", value: "White" },
    { label: "Other", value: "Other" },
  ]);
  const [genderItems, setGenderItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ]);

  const handleRegister = async () => {
    try {
      const user = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

      const myCollection = collection(db, "users");
      const myDocRef = doc(myCollection, user.user.uid);
      const myDocumentData = {
        firstName,
        lastName,
        ethnicity,
        gender,
        major,
      };

      await setDoc(myDocRef, myDocumentData);

      console.log("New document added with ID:", user.user.uid);
      if (user) {
        router.replace("/login");
      }
    } catch (error) {
      console.log(error);
      alert("Sign up failed: " + (error));
    }
  };

  const handleBackPress = () => {
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backArrow}>
        <Icon name="arrow-left" size={24} color="#007BFF" />
      </TouchableOpacity>
      <Image source={require("@/assets/images/CRPtrans.png")} style={styles.logo} />
      <Text style={styles.title}>Register</Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} placeholderTextColor="#aaa" />
        <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} placeholderTextColor="#aaa" />
        <TextInput style={styles.input} placeholder="School Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholderTextColor="#aaa" />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} autoCapitalize="none" placeholderTextColor="#aaa" secureTextEntry={true}/>
        <TextInput style={styles.input} placeholder="Major" value={major} onChangeText={setMajor} placeholderTextColor="#aaa" />
        
        <DropDownPicker open={ethnicityOpen} value={ethnicity} items={ethnicityItems} setOpen={setEthnicityOpen} setValue={setEthnicity} setItems={setEthnicityItems} placeholder="Select Ethnicity" style={styles.dropdown} zIndex={3000} zIndexInverse={1000} />
        <DropDownPicker open={genderOpen} value={gender} items={genderItems} setOpen={setGenderOpen} setValue={setGender} setItems={setGenderItems} placeholder="Select Gender" style={styles.dropdown} zIndex={2000} zIndexInverse={2000} />
      </View>

      <TouchableOpacity onPress={handleBackPress}>
        <Text style={styles.backButton}>Already have an account? Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  inputContainer: {
    width: "90%",
    alignItems: "center",
  },
  backArrow: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 1,
  },
  logo: {
    height: 150,
    width: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
    width: "100%",
    marginBottom: 12,
    paddingLeft: 12,
    color: "#333",
    backgroundColor: "#f1f1f1",
  },
  dropdown: {
    width: "100%",
    marginBottom: 12,
  },
  backButton: {
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
