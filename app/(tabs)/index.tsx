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
import { TopNav } from "@/components/TopNav";
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
  const [resources, setResources] = useState<Resource[]>([]); // Use the Resource type here

  // Fetch resources from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "resources"), (snapshot) => {
      const resourceData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Resource[]; // Type assertion here
      setResources(resourceData);
      
    });
    return unsubscribe;
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require("@/assets/images/CRP-Logo.png")}
      />
      <TopNav link1="Blog" link2="Resources" />

      {/* Static Blog Section */}
      <Image
        style={styles.blogPhoto}
        source={require("@/assets/images/blog1.png")}
      />
      <Text style={styles.bodyText}>
        The effectiveness of an internship on professional prospects
      </Text>

      {/* Dynamic Resources Section */}
      {resources.map((resource) => (
        
        <TouchableOpacity
          key={resource.id}
          onPress={() => console.log("Clicked:", resource.imageUrl)}
        >
          <Image
            style={styles.blogPhoto2}
            
            source={{ uri: resource.imageUrl}}
          />
          <Text style={styles.bodyText}>{resource.title}</Text>
          <Text style={styles.resourceDescription}>
            {resource.description}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "grey",
  },
  tinyLogo: {
    width: 100,
    height: 50,
    position: "absolute",
    top: 60,
    alignContent: "center",
  },
  blogPhoto: {
    width: 347,
    height: 151,
    marginBottom: 20,
  },
  blogPhoto2: {
    width: 347,
    height: 151,
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 17,
    marginBottom: 8,
    color: "#fff",
  },
  resourceDescription: {
    fontSize: 14,
    marginBottom: 24,
    color: "#ccc",
  },
});
