import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { supabase } from "../SupabaseConfig"; // Import Supabase client

export default function TabTwoScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [major, setMajor] = useState("");
  const [email, setEmail] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Fetch user profile data from Supabase
  useEffect(() => {
    const fetchProfileInfo = async () => {
      const { data: user, error: authError } = await supabase.auth.getUser();

      if (authError || !user?.user) {
        console.error("Error fetching user:", authError);
        return;
      }

      const userId = user.user.id;
      console.log("User ID:", userId);

      const { data, error } = await supabase
        .from("users")
        .select("firstName, major, email")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile info:", error);
      } else if (data) {
        setFirstName(data.firstName || "");
        setMajor(data.major || "");
        setEmail(data.email || "");
      }
    };

    fetchProfileInfo();
  }, []);

  const handleImageChange = async () => {
    // Request permission to access images
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Launch the image picker
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio
      quality: 1,
    });

    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      setImageSrc(pickerResult.assets[0].uri); // Get the URI of the selected image
    }
  };

  const handleEditProfile = () => {
    // Placeholder function for navigating to an edit profile screen
    console.log("Edit Profile Clicked");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Your Upcoming Events</Text>
      <Image
        source={
          imageSrc
            ? { uri: imageSrc }
            : require("@/assets/images/braver-blank-pfp_new.jpg")
        }
        style={styles.profilePhoto}
      />
      <Text style={styles.subtitle}>About</Text>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.label}>{firstName}</Text>
      <Text style={styles.label}>Major:</Text>
      <Text style={styles.label}>{major}</Text>
      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.text}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  subtitle: {
    fontSize: 25,
    fontWeight: "800",
    color: "#1A237E",
    marginBottom: 40,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "800",
    color: "black",
    marginBottom: 15,
  },
  button: {
    width: "90%",
    backgroundColor: "#5C6BC0",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5C6BC0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 15,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
