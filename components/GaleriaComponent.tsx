import { Alert, Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type GaleriaProps = {
  selectedImage: string | null;
  onImageChange: (uri: string | null) => void;
};

export default function GaleriaComponent({
  selectedImage,
  onImageChange,
}: GaleriaProps) {
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permissão necessária', 'Autorize o acesso à galeria.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      onImageChange(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galeria</Text>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Escolher foto</Text>
      </TouchableOpacity>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Nenhuma mídia selecionada</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    color: '#183153',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: 220,
    marginTop: 12,
    borderRadius: 12,
  },
  placeholder: {
    height: 220,
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: '#EFF4FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#94A3B8',
  },
});
