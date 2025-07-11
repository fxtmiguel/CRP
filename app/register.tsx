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
import { router } from "expo-router";
import { supabase } from "./SupabaseConfig"; // Import from Supabase configuration

interface DropdownItem {
  label: string;
  value: string;
}

export default function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [ethnicity, setEthnicity] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [ethnicityOpen, setEthnicityOpen] = useState<boolean>(false);
  const [genderOpen, setGenderOpen] = useState<boolean>(false);
  const [ethnicityItems, setEthnicityItems] = useState<DropdownItem[]>([
    { label: "Asian", value: "Asian" },
    { label: "Black or African American", value: "Black" },
    { label: "Hispanic or Latino", value: "Hispanic" },
    { label: "White", value: "White" },
    { label: "Other", value: "Other" },
  ]);
  const [genderItems, setGenderItems] = useState<DropdownItem[]>([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ]);

  const handleRegister = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;

      const user = data.user;
      if (user) {
        await supabase.from("users").insert([
          {
            id: user.id,
            firstName,
            lastName,
            ethnicity,
            gender,
            major,
          },
        ]);
        router.replace("/login");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert("Sign up failed: " + error.message);
      } else {
        alert("Sign up failed");
      }
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
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Major"
          value={major}
          onChangeText={setMajor}
          placeholderTextColor="#aaa"
        />

        <DropDownPicker
          open={ethnicityOpen}
          value={ethnicity}
          items={ethnicityItems}
          setOpen={setEthnicityOpen}
          setValue={setEthnicity}
          setItems={setEthnicityItems}
          placeholder="Select Ethnicity"
          style={styles.dropdown}
          zIndex={3000} // Higher zIndex so it stays on top when open
          zIndexInverse={1000}
        />

        <DropDownPicker
          open={genderOpen}
          value={gender}
          items={genderItems}
          setOpen={setGenderOpen}
          setValue={setGender}
          setItems={setGenderItems}
          placeholder="Select Gender"
          style={styles.dropdown}
          zIndex={2000} // Lower zIndex so it doesn't overlap ethnicity dropdown
          zIndexInverse={4000} // Ensures proper stacking when closed
        />
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

