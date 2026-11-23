import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import * as Location from 'expo-location';

export default function LocalizacaoComponent() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  let text = 'Obtendo sua localização...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Localização</Text>
      {location ? (
        <View style={styles.locationBox}>
          <Text style={styles.label}>Latitude</Text>
          <Text style={styles.value}>{location.coords.latitude.toFixed(6)}</Text>
          <Text style={styles.label}>Longitude</Text>
          <Text style={styles.value}>{location.coords.longitude.toFixed(6)}</Text>
        </View>
      ) : (
        <Text style={styles.paragraph}>{text}</Text>
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
  locationBox: {
    backgroundColor: '#EFF4FA',
    borderRadius: 12,
    padding: 14,
  },
  label: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 4,
  },
  value: {
    color: '#183153',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  paragraph: {
    color: '#64748B',
    fontSize: 15,
    textAlign: 'left',
  },
});