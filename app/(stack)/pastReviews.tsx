import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const PastReviewsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        {/* need to change this to actually be centered and not have the spaces */}
        <View style={styles.centered}>
          <ThemedText type="title">Past Reviews{'\n'}</ThemedText>
        </View>
      </ThemedView>
      <ThemedText>{'\n'} On the rox was so fun last night!!: </ThemedText> 
      <ThemedText>{'\n'} I had so much fun last night at Mate Bar!! </ThemedText> 
      <ThemedText>{'\n'} The Ice Club could have been a bit better </ThemedText> 


    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },  titleContainer: {
      flexDirection: 'row',
      gap: 8,
      backgroundColor: 'rgba(0,0,0,0)',

    },
    centered: {
      alignItems: 'center',
    },
  });
  
  export default PastReviewsScreen;