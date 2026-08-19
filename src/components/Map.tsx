import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export interface MapMarkerProps {
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface MapProps {
  markers: MapMarkerProps[];
  style?: any;
}

export default function AppMap({ markers, style }: MapProps) {
  if (markers.length === 0) return null;

  return (
    <MapView
      style={[styles.map, style]}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: markers[0].latitude,
        longitude: markers[0].longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
      scrollEnabled={false}
      zoomEnabled={false}
    >
      {markers.map((m, i) => (
        <Marker
          key={i}
          coordinate={{ latitude: m.latitude, longitude: m.longitude }}
          title={m.title}
          description={m.description}
        >
          {m.icon}
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 },
});
