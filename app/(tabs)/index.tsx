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
import { supabase } from "../SupabaseConfig"; // Import Supabase client

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

  // Fetch resources from Supabase
  useEffect(() => {
    const fetchResources = async () => {
      const { data, error } = await supabase.from("resources").select("*");
      if (error) {
        console.error("Error fetching resources:", error);
      } else {
        setResources(data);
      }
    };

    fetchResources();

    // Optional: Set up real-time updates (uncomment if needed)
    const subscription = supabase
      .channel("resources")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "resources" },
        fetchResources
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
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
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  tinyLogo: {
    width: 250,
    height: 125,
    marginTop: 40,
    alignSelf: "center",
    resizeMode: "contain",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  navButton: {
    backgroundColor: "#555",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  navButtonActive: {
    backgroundColor: "#007BFF",
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
    marginTop: 20,
    marginBottom: 20,
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
