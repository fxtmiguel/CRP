import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ImageViewer from "@/components/imageView";

const PlaceholderImage1 = require('@/assets/images/ontherox.png');
const PlaceholderImage2 = require('@/assets/images/Mate-bare.jpg');
const PlaceholderImage3 = require('@/assets/images/ice-bar.jpg');

export default function Favorites() {
  const router = useRouter();

  const navigateToBarProfile = (barName: string) => {
    router.push({ pathname: '../(stack)/barProfile' });
  };
  

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/CRPtrans.png')} style={styles.CRPLogo} />
      
      {/* On the Rox Image */}
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigateToBarProfile('On the Rox')}>
          <ImageViewer imgSource={PlaceholderImage1} /> 
        </TouchableOpacity>
        <Text style={styles.textBox}>Closes: 2:00</Text>
      </View> 

      {/* Matebar Image */}
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigateToBarProfile('Matebar')}>
          <ImageViewer imgSource={PlaceholderImage2} />
        </TouchableOpacity>
        <Text style={styles.textBox1}>Closes: 1:30</Text>
      </View> 

      {/* Ice Bar Image */}
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigateToBarProfile('Ice Bar')}>
          <ImageViewer imgSource={PlaceholderImage3} />
        </TouchableOpacity>
        <Text style={styles.textBox2}>Closes: 1:30</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    left: -150,
    bottom: -10,
    fontSize: 24,
    color: '#fff'
  },
  CRPLogo: {
    height: 78,
    width: 90,
    bottom: 720,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 0.25,
    bottom: 150
  },
  image: {
    width: 120,
    height: 140,
    borderRadius: 18,
  },
  textBox: {
    position: 'absolute',
    fontSize: 20,
    color: 'white',
    top: 270,
    left: 10,
    backgroundColor: 'black',
    borderRadius: 23,
    width: 180,
    height: 25,
    textAlign: 'center',
  },
  textBox1: {
    position: 'absolute',
    fontSize: 20,
    color: 'white',
    top: 270,
    left: 10,
    backgroundColor: 'black',
    borderRadius: 23,
    width: 180,
    height: 25,
    textAlign: 'center',
  },
  textBox2: {
    position: 'absolute',
    fontSize: 20,
    color: 'white',
    top: 270,
    left: 10,
    backgroundColor: 'black',
    borderRadius: 23,
    width: 180,
    height: 25,
    textAlign: 'center',
  },
});