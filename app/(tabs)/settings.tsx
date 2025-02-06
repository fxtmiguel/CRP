import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, StyleSheet } from 'react-native';
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSignOut = () => {
    console.log("sign out");
    router.push('/login');
  }

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.item}>
        <View style={styles.iconText}>
          <FontAwesome name="user-o" size={24} color="#fff" />
          <Text style={styles.text}>Accounts</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.iconText}>
          <FontAwesome name="bell-o" size={24} color="#fff" />
          <Text style={styles.text}>Notifications</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.iconText}>
          <FontAwesome name="question-circle-o" size={24} color="#fff" />
          <Text style={styles.text}>Customer Support</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.iconText}>
          <FontAwesome name="lock" size={24} color="#fff" />
          <Text style={styles.text}>Privacy</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.iconText}>
          <FontAwesome name="eye" size={24} color="#fff" />
          <Text style={styles.text}>Appearances</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.item}>
        <View style={styles.iconText}>
          <FontAwesome name="sun-o" size={24} color="#fff" />
          <Text style={styles.text}>Light/Night Mode</Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
      </View>

      <TouchableOpacity style={styles.item}>
        <View style={styles.iconText}>
          <FontAwesome name="info-circle" size={24} color="#fff" />
          <Text style={styles.text}>About</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey', // Dark background
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  signOutButton: {
    backgroundColor: '#6200EE', // Light blue
    padding: 15,
    marginVertical: 20,
    borderRadius: 999,
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});