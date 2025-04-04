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
          <FontAwesome style={styles.icon} name="user-o" size={24} color="#000" />
          <Text style={styles.text}>Accounts</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#AAA" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.iconText}>
          <FontAwesome style={styles.icon} name="bell-o" size={24} color="#000" />
          <Text style={styles.text}>Notifications</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#AAA" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.iconText}>
          <FontAwesome style={styles.icon} name="question-circle-o" size={24} color="#000" />
          <Text style={styles.text}>Customer Support</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#AAA" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.iconText}>
          <FontAwesome style={styles.icon} name="lock" size={24} color="#000" />
          <Text style={styles.text}>Privacy</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#AAA" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.iconText}>
          <FontAwesome style={styles.icon} name="eye" size={24} color="#000" />
          <Text style={styles.text}>Appearances</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#AAA" />
      </TouchableOpacity>

      <View style={styles.item}>
        <View style={styles.iconText}>
          <FontAwesome style={styles.icon} name="sun-o" size={24} color="#000" />
          <Text style={styles.text}>Dark Mode</Text>
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
          <FontAwesome style={styles.icon} name="info-circle" size={24} color="#000" />
          <Text style={styles.text}>About</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#AAA" />
      </TouchableOpacity>

      <Text style={styles.signOutText} onPress={handleSignOut}>Sign Out</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Dark background
    paddingHorizontal: 20,
    paddingTop: 50,
    },
    title: {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 20,
    paddingLeft: 5
    },
    item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF"
    },
    iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    },
    text: {
    color: '#000000',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold'
    },
    icon: {
    minWidth: 36,
    textAlign: 'center',
    fontWeight: 'bold'
    },
    signOutButton: {
    backgroundColor: '#6200EE', // Light blue
    padding: 15,
    marginVertical: 20,
    borderRadius: 999,
    alignItems: 'center', // DEPRECATED
  },
  signOutText: {
    color: '#FF5555',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
});