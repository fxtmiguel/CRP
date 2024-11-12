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
import { FIREBASE_AUTH, signInWithEmailAndPassword } from "./FirebaseConfig"; // Import from firebaseConfig

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      // Sign in using Firebase Authentication
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      console.log("Login successful");
      // Redirect to the home page (index)
      router.push("./(tabs)");
    } catch (error) {
      // Handle login error
      console.error("error");
      setErrorMessage("Invalid email or password");
    }
  };

  const handleSignUp = () => {
    // Handle sign-up logic here (you could navigate to a sign-up page)
    router.push("/register");
    console.log("Redirect to sign-up page");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/CRP-Logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signUpButton]}
        onPress={handleSignUp}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    height: 200,
    width: 400,
    marginBottom: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
    fontFamily: "Roboto",
    textTransform: "uppercase",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    padding: 10,
    borderRadius: 5,
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 20,
    borderRadius: 999,
    backgroundColor: "#333",
    color: "#fff",
    fontSize: 16,
  },
  button: {
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
  signUpButton: {
    backgroundColor: "#888",
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
