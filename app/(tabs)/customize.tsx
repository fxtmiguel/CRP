import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { db, FIREBASE_AUTH } from "../FirebaseConfig";



export default function TabTwoScreen() {
  const router = useRouter();
  const [firstName, setName] = useState("");
  const [major, setMajor] = useState("")
  const [email, setEmail] = useState("")
  useEffect(() => {
    getProfileInfo().then((data) => {
      if (data) {
        setName(data.firstName);
        setMajor(data.major);
        console.log(data);
      }
    });
  }, []);

  async function getProfileInfo() {
    const user = FIREBASE_AUTH.currentUser!;
    console.log(user.uid);

    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
        return {
          firstName: data?.firstName || "",
          major: data?.major || "",
        };
      } else {
        console.error("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching profile info:", error);
      return null;
    }
  }

  const [imageSrc, setImageSrc] = useState<string | null>(null); // Specify type as string | null

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

  // naviagation for the buttons
  const navigateToPastReviews = () => router.push("../(stack)/pastReviews");
  const navigateToPastRatings = () => router.push("../(stack)/pastRatings");
  const navigateToFriends = () => router.push("../(stack)/friends");

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
      <TouchableOpacity
        style={styles.button}
        onPress={() => FIREBASE_AUTH.signOut()}
      >
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey", // A softer white for a modern, minimalist background
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
  separator: {
    marginVertical: 30,
    height: 2, // Slightly thicker for a more pronounced separation
    width: "80%",
    backgroundColor: "#E8EAF6", // Using a light indigo to match the border of the textInput
  },
  button: {
    width: "90%",
    backgroundColor: "#5C6BC0", // A lighter indigo to complement the title color
    padding: 20,
    borderRadius: 15, // Softly rounded corners for a modern, friendly touch
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5C6BC0", // Shadow color to match the button for a cohesive look
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5, // Slightly elevated for a subtle 3D effect
    marginTop: 15, // Adjusted to match the new style
  },
  text: {
    color: "#FFFFFF", // Maintained white for clear visibility
    fontSize: 18, // Slightly larger for emphasis
    fontWeight: "600", // Semi-bold for a balanced weight
  },
});
