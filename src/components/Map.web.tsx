import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

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

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

export default function AppMap({ markers, style }: MapProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  const [GoogleMapsModule, setGoogleMapsModule] = React.useState<any>(null);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      import('@react-google-maps/api').then((mod) => {
        setGoogleMapsModule(mod);
      });
    }
  }, [isMounted]);

  if (!isMounted || typeof window === 'undefined') {
    return <View style={[styles.fallback, style]} />;
  }

  if (!GoogleMapsModule) {
    return <View style={[styles.fallback, style]} />;
  }

  if (markers.length === 0) return null;

  return (
    <GoogleMapsInner
      markers={markers}
      style={style}
      GoogleMap={GoogleMapsModule.GoogleMap}
      Marker={GoogleMapsModule.Marker}
      useJsApiLoader={GoogleMapsModule.useJsApiLoader}
    />
  );
}

// Separated into its own component so useJsApiLoader hook is only called client-side
function GoogleMapsInner({
  markers,
  style,
  GoogleMap,
  Marker,
  useJsApiLoader,
}: {
  markers: MapMarkerProps[];
  style?: any;
  GoogleMap: any;
  Marker: any;
  useJsApiLoader: any;
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (loadError) {
    return (
      <View style={[styles.fallback, style]}>
        <Text>Map cannot be loaded right now, sorry.</Text>
      </View>
    );
  }

  if (!isLoaded) {
    return <View style={[styles.fallback, style]} />;
  }

  return (
    <View style={[styles.map, style]}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: markers[0].latitude, lng: markers[0].longitude }}
        zoom={14}
        options={{ disableDefaultUI: true, gestureHandling: 'none' }}
      >
        {markers.map((m: MapMarkerProps, i: number) => (
          <Marker
            key={i}
            position={{ lat: m.latitude, lng: m.longitude }}
            title={m.title}
          />
        ))}
      </GoogleMap>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 },
  fallback: { width: '100%', height: '100%', backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, left: 0 }
});
