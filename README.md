# 🍔 FoodChain — Yemek Sipariş Uygulaması

FoodChain, React Native (Expo SDK 57) ile geliştirilmiş, cross-platform bir yemek sipariş uygulamasıdır. Hem müşteri hem de restoran sahipleri için ayrı paneller içerir.

## 📱 Özellikler

### Müşteri Paneli
- 🏠 Ana sayfa (kategoriler, öne çıkanlar, yakındaki restoranlar)
- 🔍 Restoran ve yemek arama
- 🍽️ Restoran detay ve menü görüntüleme
- 🛒 Sepet yönetimi ve miktar kontrolleri
- 💳 Mock ödeme sistemi (herhangi bir kart numarası kabul eder)
- 📋 Sipariş geçmişi ve aktif siparişler
- 📍 Canlı sipariş takibi (simülasyon)
- 👤 Profil ve ayarlar

### Restoran Paneli
- 📊 Dashboard (günlük istatistikler, haftalık grafik)
- 📋 Gelen sipariş yönetimi ve durum güncelleme
- 🍽️ Menü yönetimi (ürün listeleme, stok durumu, silme)
- ⚙️ Restoran ayarları

### Genel
- 🌍 Çoklu dil desteği (Türkçe / İngilizce)
- 🌙 Karanlık mod
- 🔐 Rol bazlı kimlik doğrulama (Müşteri / Restoran Sahibi)
- 📱 Google AdMob entegrasyonu (test ID'leri ile)
- 🗺️ Google Maps entegrasyonu için altyapı

## 🛠️ Teknolojiler

| Teknoloji | Açıklama |
|---|---|
| React Native 0.86 | Cross-platform mobil framework |
| Expo SDK 57 | Geliştirme ve build platformu |
| Expo Router | Dosya tabanlı navigasyon |
| TypeScript | Tip güvenli geliştirme |
| Zustand | State management |
| TanStack React Query | Server state management |
| i18next | Çoklu dil desteği |
| expo-image | Performanslı resim yükleme |
| react-native-maps | Google Maps entegrasyonu |
| react-native-google-mobile-ads | Reklam entegrasyonu |

## 🚀 Kurulum

### Gereksinimler
- Node.js >= 18
- npm veya yarn
- Expo CLI
- iOS: Xcode (macOS gerekli)
- Android: Android Studio + SDK

### Adımlar

```bash
# 1. Repo'yu klonlayın
git clone https://github.com/YOUR_USERNAME/foodchain.git
cd foodchain

# 2. Bağımlılıkları kurun
npm install

# 3. Uygulamayı başlatın
npx expo start
```

### Demo Hesaplar

| Rol | E-posta | Şifre |
|---|---|---|
| 🛒 Müşteri | customer@test.com | 123456 |
| 🏪 Restoran | restaurant@test.com | 123456 |

> Herhangi bir e-posta/şifre ile de giriş yapabilirsiniz (otomatik müşteri hesabı oluşturulur).

## 📁 Proje Yapısı

```
src/
├── app/                    # Expo Router ekranları
│   ├── (auth)/             # Giriş, kayıt, şifre sıfırlama
│   ├── (customer)/         # Müşteri paneli
│   │   ├── (tabs)/         # Ana sayfa, arama, siparişler, profil
│   │   ├── restaurant/     # Restoran detay [id]
│   │   ├── tracking/       # Sipariş takip [orderId]
│   │   ├── cart.tsx         # Sepet
│   │   └── checkout.tsx     # Ödeme
│   └── (restaurant)/       # Restoran paneli
│       └── (tabs)/         # Dashboard, siparişler, menü, ayarlar
├── components/ui/          # Yeniden kullanılabilir UI bileşenleri
├── constants/              # Tema, config
├── data/                   # Demo veriler
├── hooks/                  # Custom hook'lar
├── i18n/                   # Dil dosyaları (tr/en)
├── services/               # AdMob vb. servisler
├── store/                  # Zustand store'ları
├── types/                  # TypeScript tipleri
└── utils/                  # Yardımcı fonksiyonlar
```

## 🏗️ Build & Yayınlama

### EAS Build Kurulumu

```bash
# EAS CLI kur
npm install -g eas-cli

# EAS projesini yapılandır
eas login
eas build:configure

# Development build
eas build --platform android --profile development
eas build --platform ios --profile development

# Production build
eas build --platform android --profile production
eas build --platform ios --profile production
```

### Google Play Store
1. `eas build --platform android --profile production` ile APK/AAB oluşturun
2. Google Play Console'da uygulama oluşturun
3. AAB dosyasını yükleyin

### Apple App Store
1. `eas build --platform ios --profile production` ile IPA oluşturun
2. App Store Connect'te uygulama oluşturun
3. EAS Submit ile yükleyin: `eas submit --platform ios`

## ⚙️ Yapılandırma

### Google Maps
`app.json` dosyasında API anahtarlarınızı güncelleyin:
```json
"ios": { "config": { "googleMapsApiKey": "YOUR_KEY" } },
"android": { "config": { "googleMaps": { "apiKey": "YOUR_KEY" } } }
```

### Google AdMob
`app.json` dosyasında AdMob App ID'lerini gerçek ID'lerinizle değiştirin:
```json
["react-native-google-mobile-ads", {
  "androidAppId": "ca-app-pub-XXXX~YYYY",
  "iosAppId": "ca-app-pub-XXXX~YYYY"
}]
```

## 📄 Lisans

MIT License

## 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır. Büyük değişiklikler için lütfen önce bir issue açın.
