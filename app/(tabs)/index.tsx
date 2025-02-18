import {
  Text,
  StyleSheet,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../FirebaseConfig"; // Adjust path if needed

// Define the shape of a resource
interface Resource {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);

  // Fetch resources from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "resources"), (snapshot) => {
      const resourceData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Resource[];
      setResources(resourceData);
    });
    return unsubscribe;
  }, []);

  // Ensure we only display two resources
  const displayedResources = resources.slice(0, 2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* CRP Logo */}
      <Image
        style={styles.tinyLogo}
        source={require("@/assets/images/CRPtrans.png")}
      />

      {/* Navigation Buttons */}
      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.navButtonActive}>
          <Text style={styles.navText}>Blog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.navText}>Resources</Text>
        </TouchableOpacity>
      </View>
      
      {/* Dynamic Resources Section (Only First 2 Images) */}
      {displayedResources.map((resource) => (
        <TouchableOpacity
          key={resource.id}
          onPress={() => console.log("Clicked:", resource.imageUrl)}
        >
          <Image style={styles.blogPhoto} source={{ uri: resource.imageUrl }} />
          <Text style={styles.bodyText}>{resource.title}</Text>
          <Text style={styles.resourceDescription}>{resource.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start", // Align items to the top
    alignItems: "center",
    padding: 16,
    backgroundColor: "grey",
  },
  tinyLogo: {
    width: 250,
    height: 125,
    marginTop: 40, // Adds space from the top of the screen
    alignSelf: "center",
    resizeMode: "contain", // This ensures the logo is resized to fit within the bounds without cropping
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20, // Space between logo and buttons
  },
  navButton: {
    backgroundColor: "#555", // Darker color for inactive tab
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  navButtonActive: {
    backgroundColor: "#007BFF", // Highlighted color for active page
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  navText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  blogPhoto: {
    width: 347,
    height: 151,
    marginTop: 20, // Adds space between the buttons and the images
    marginBottom: 20, // Adds space between the images
    borderRadius: 15,
    overflow: "hidden",
  },
  bodyText: {
    fontSize: 17,
    marginBottom: 8,
    color: "#fff",
    textAlign: "left",
    alignSelf: "flex-start",
    width: "90%",
  },
  resourceDescription: {
    fontSize: 14,
    marginBottom: 24,
    color: "#ccc",
    textAlign: "left",
    alignSelf: "flex-start",
    width: "90%",
  },
});
