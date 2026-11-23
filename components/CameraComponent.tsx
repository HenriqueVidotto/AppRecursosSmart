import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CameraComponentProps = {
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
  onPictureTaken: (uri: string) => void;
};

export default function CameraComponent({
  visible,
  onOpen,
  onClose,
  onPictureTaken,
}: CameraComponentProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  if (!visible) {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Câmera</Text>
        <Text style={styles.cardDescription}>Abra a câmera para tirar uma foto.</Text>
        <TouchableOpacity style={styles.openButton} onPress={onOpen}>
          <Text style={styles.permissionButtonText}>Abrir câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!permission) {
    return (
      <Modal visible transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.permissionCard}>
            <Text style={styles.cardTitle}>Câmera</Text>
            <Text style={styles.message}>Carregando permissões...</Text>
          </View>
        </View>
      </Modal>
    );
  }

  if (!permission.granted) {
    return (
      <Modal visible transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.permissionCard}>
            <Text style={styles.cardTitle}>Câmera</Text>
            <Text style={styles.message}>Autorize o uso da câmera para continuar.</Text>
            <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
              <Text style={styles.permissionButtonText}>Permitir câmera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelTextButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    const picture = await cameraRef.current?.takePictureAsync({ quality: 1 });
    if (picture?.uri) {
      onPictureTaken(picture.uri);
    }
  }

  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <View style={styles.fullscreen}>
        <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
        <View style={styles.controls}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.controlText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureInner} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={toggleCameraFacing}>
            <Text style={styles.controlText}>Inverter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardDescription: {
    color: '#64748B',
    marginBottom: 12,
  },
  openButton: {
    backgroundColor: '#0F766E',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionCard: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  cardTitle: {
    color: '#183153',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 12,
  },
  fullscreen: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  controls: {
    height: 110,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
    minWidth: 72,
    alignItems: 'center',
  },
  permissionButton: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 8,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  cancelTextButton: {
    paddingVertical: 8,
  },
  cancelText: {
    color: '#64748B',
  },
  controlText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});