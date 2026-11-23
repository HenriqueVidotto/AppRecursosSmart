import React, { useState } from 'react'; 
import { 
  Text, 
  ScrollView, 
  StyleSheet,
  StatusBar
} from 'react-native'; 

import AudioComponent from './components/AudioComponent'; 
import CameraComponent from './components/CameraComponent'; 
import GaleriaComponent from './components/GaleriaComponent'; 
import LocalizacaoComponent from './components/LocalizacaoComponent'; 

export default function App() { 
  const [cameraVisible, setCameraVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return ( 
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Recursos Inteligentes</Text>
        <Text style={styles.subtitle}>Acesse os recursos disponíveis no dispositivo</Text>
        <GaleriaComponent
          selectedImage={selectedImage}
          onImageChange={setSelectedImage}
        />
        <CameraComponent
          visible={cameraVisible}
          onOpen={() => setCameraVisible(true)}
          onClose={() => setCameraVisible(false)}
          onPictureTaken={(uri) => {
            setSelectedImage(uri);
            setCameraVisible(false);
          }}
        />
        <LocalizacaoComponent />
        <AudioComponent />
      </ScrollView>
    </>
  ); 
} 

const styles = StyleSheet.create({ 
  screen: {
    flex: 1, 
    backgroundColor: '#F4F7FB',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  }, 
  title: { 
    fontSize: 28,
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#183153',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 18,
    fontSize: 15,
    textAlign: 'center',
    color: '#64748B',
  }, 
});