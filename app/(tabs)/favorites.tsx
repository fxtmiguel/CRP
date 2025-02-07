import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const PlaceholderImage1 = require("@/assets/images/blog1.png");
const PlaceholderImage2 = require("@/assets/images/blog1.png");

export default function ChatsScreen() {
  const router = useRouter();

  const navigateToChat = (chatName: string) => {
    router.push({ pathname: '../(stack)/chatProfile', params: { chatName } });
  };

  const handleJoinGroupChat = () => {
    // Navigate to a screen where user can join or create a new group chat
    router.push({ pathname: '../(stack)/joinGroupChat' });
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/CRPtrans.png')} style={styles.CRPLogo} />

      {/* Group Chats Title */}
      <Text style={styles.title}>Group Chats</Text>

      {/* Deloitte Tour Chat Box */}
      <View style={styles.chatContainer}>
        <TouchableOpacity onPress={() => navigateToChat('Deloitte Tour')}>
          <Image source={PlaceholderImage1} style={styles.chatImage} />
        </TouchableOpacity>
        <Text style={styles.chatText}>Deloitte Tour</Text>
      </View>

      {/* GIlead Tour Chat Box */}
      <View style={styles.chatContainer}>
        <TouchableOpacity onPress={() => navigateToChat('GIlead Tour')}>
          <Image source={PlaceholderImage2} style={styles.chatImage} />
        </TouchableOpacity>
        <Text style={styles.chatText}>GIlead Tour</Text>
      </View>

      {/* Join a Group Chat Button */}
      <TouchableOpacity style={styles.joinButton} onPress={handleJoinGroupChat}>
        <Text style={styles.joinButtonText}>Join a Group Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  CRPLogo: {
    height: 80,
    width: 90,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  chatContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    marginBottom: 20,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  chatImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  chatText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  joinButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginTop: 30,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
