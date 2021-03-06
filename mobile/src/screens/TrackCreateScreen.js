import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { requestPermissionAsync } from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '../components/Map';

const TrackCreateScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>Create a Track</Text>
      <Map />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;
