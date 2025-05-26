// app/group-details.tsx
import { View, Text, Image, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';
import { supabase } from './SupabaseConfig';


export default function GroupDetailsScreen() {
  const { eventName } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActionItem = async () => {
      const { data, error } = await supabase
        .from('action_items')
        .select('liability_form, survey')
        .eq('event_name', eventName)
        .single();

      if (error) {
        console.error('Error fetching action items:', error);
      } else {
        setData(data);
      }
      setLoading(false);
    };

    fetchActionItem();
  }, [eventName]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>Loading resources...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>No resources found for {eventName}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{eventName} Resources</Text>

      <View style={styles.card}>
        <Image source={require('../assets/images/CRPtrans.png')} style={styles.image} />
        <Button title="Open Liability Form" onPress={() => Linking.openURL(data.liability_form)} />
      </View>

      <View style={styles.card}>
        <Image source={require('../assets/images/survey.png')} style={styles.image} />
        <Button title="Open Survey" onPress={() => Linking.openURL(data.survey)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { marginVertical: 15, alignItems: 'center' },
  image: { width: 200, height: 120, resizeMode: 'contain', marginBottom: 10 },
});
