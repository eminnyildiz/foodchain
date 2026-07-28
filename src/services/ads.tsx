import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

// AdMob Test IDs
const BANNER_AD_UNIT_ID = Platform.select({
  ios: 'ca-app-pub-3940256099942544/2934735716',
  android: 'ca-app-pub-3940256099942544/6300978111',
  default: 'ca-app-pub-3940256099942544/6300978111',
});

const INTERSTITIAL_AD_UNIT_ID = Platform.select({
  ios: 'ca-app-pub-3940256099942544/4411468910',
  android: 'ca-app-pub-3940256099942544/1033173712',
  default: 'ca-app-pub-3940256099942544/1033173712',
});

// Banner Ad Component
// Uses test ad unit IDs - replace with real ones for production
interface BannerAdProps {
  size?: 'banner' | 'largeBanner' | 'mediumRectangle';
  style?: any;
}

export const BannerAd: React.FC<BannerAdProps> = ({ size = 'banner', style }) => {
  // In production, use react-native-google-mobile-ads BannerAd component
  // For now, this is a placeholder that shows the ad space
  const heights: Record<string, number> = {
    banner: 50,
    largeBanner: 100,
    mediumRectangle: 250,
  };

  return (
    <View style={[styles.bannerContainer, { height: heights[size] }, style]}>
      <View style={[styles.bannerPlaceholder, { height: heights[size] }]}>
        {/* In production, replace with actual BannerAd from react-native-google-mobile-ads */}
      </View>
    </View>
  );
};

// Interstitial Ad Helper
let interstitialLoaded = false;
let interstitialCallback: (() => void) | null = null;

export const loadInterstitialAd = () => {
  // In production, load the interstitial ad
  // const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_AD_UNIT_ID);
  // interstitial.load();
  interstitialLoaded = true;
};

export const showInterstitialAd = (onDismiss?: () => void): boolean => {
  if (interstitialCallback) interstitialCallback = null;

  if (!interstitialLoaded) {
    loadInterstitialAd();
    onDismiss?.();
    return false;
  }

  // In production:
  // interstitial.show();
  // interstitial.addAdEventListener(AdEventType.CLOSED, onDismiss);

  // For demo: just call the callback after a brief delay
  if (onDismiss) {
    setTimeout(onDismiss, 500);
  }

  interstitialLoaded = false;
  loadInterstitialAd(); // Pre-load next one
  return true;
};

// Hook for showing interstitial after N orders
export const useInterstitialAfterOrders = (orderCount: number, threshold: number = 3) => {
  useEffect(() => {
    loadInterstitialAd();
  }, []);

  useEffect(() => {
    if (orderCount > 0 && orderCount % threshold === 0) {
      showInterstitialAd();
    }
  }, [orderCount, threshold]);
};

// Ad config exports for easy replacement
export const AdConfig = {
  BANNER_AD_UNIT_ID,
  INTERSTITIAL_AD_UNIT_ID,
  // Replace these with your real ad unit IDs in production
  // PRODUCTION_BANNER_IOS: 'ca-app-pub-XXXX/YYYY',
  // PRODUCTION_BANNER_ANDROID: 'ca-app-pub-XXXX/YYYY',
  // PRODUCTION_INTERSTITIAL_IOS: 'ca-app-pub-XXXX/ZZZZ',
  // PRODUCTION_INTERSTITIAL_ANDROID: 'ca-app-pub-XXXX/ZZZZ',
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bannerPlaceholder: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
});
