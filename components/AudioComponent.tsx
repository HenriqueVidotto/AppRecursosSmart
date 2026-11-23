import { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorderState,
  useAudioPlayer
} from 'expo-audio';

export default function AudioComponent() {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const player = useAudioPlayer(audioRecorder.uri);
  const record = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const stopRecording = async () => {
    // The recording will be available on `audioRecorder.uri`.
    await audioRecorder.stop();
  };

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert('Permissão necessária', 'Autorize o acesso ao microfone.');
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
        // To record in the background, also set allowsBackgroundRecording: true
        // and enable the enableBackgroundRecording config plugin option.
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Áudio</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, recorderState.isRecording && styles.recordingButton]}
          onPress={recorderState.isRecording ? stopRecording : record}
        >
          <Text style={styles.buttonText}>
            {recorderState.isRecording ? 'Parar gravação' : 'Iniciar gravação'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => player.play()}>
          <Text style={styles.buttonText}>Reproduzir áudio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => {
            player.seekTo(0);
            player.play();
          }}
        >
          <Text style={styles.buttonText}>Reproduzir novamente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    color: '#183153',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  buttonsContainer: {
    gap: 15,
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12,
  },
  recordingButton: {
    backgroundColor: '#DC2626',
  },
  secondaryButton: {
    backgroundColor: '#0F766E',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});