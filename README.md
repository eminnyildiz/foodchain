# 🍔 FoodChain — Yemek Sipariş Uygulaması (v1.0.0 MVP)

FoodChain, React Native ve Expo SDK 57 kullanılarak geliştirilmiş, modern ve cross-platform (iOS, Android, Web) bir yemek sipariş uygulamasıdır. Hem müşteriler hem de restoran yöneticileri için ayrı kullanıcı arayüzleri ve paneller sunar. Projenin mimarisi, veri modelleri ve özellikleri Yazılım Tasarım Dokümanı (Software Design Document - SDD) gereksinimlerine %100 uyumlu şekilde tasarlanıp tamamlanmıştır.

---

## 📱 Temel Özellikler (MVP)

### 🛒 Müşteri Paneli
- **Giriş ve Kayıt (Authentication):**
  - E-posta ve şifre ile güvenli kimlik doğrulama.
  - Şifre sıfırlama e-postası gönderme desteği.
  - Kayıt esnasında ad, soyad, e-posta, telefon ve rol (Müşteri/Restoran) seçimi.
  - Gelişmiş girdi doğrulamaları (geçerli e-posta biçimi, şifre uzunluğu >= 6 karakter, telefon numarası biçimlendirme ve doğrulama).
  - Zustand + AsyncStorage entegrasyonu ile kalıcı oturum yönetimi.
- **Keşfet ve Ana Sayfa:**
  - Günün saatine göre kişiselleştirilmiş karşılama mesajı (Günaydın, Tünaydın, İyi Akşamlar).
  - Kullanıcının profilindeki varsayılan teslimat adresinin dinamik gösterimi.
  - 14 farklı yemek kategorisi (Pizza, Burger, Sushi, Kebab, Tatlı, İçecek vb.) arasında gezinti.
  - En popüler 5 restoranı gösteren yatay "Öne Çıkanlar" karuseli.
  - İstanbul genelindeki 15 restoranın tamamını listeleyen dikey "Yakındaki Restoranlar" listesi.
- **Gelişmiş Arama ve Filtreleme:**
  - Restoran adları, açıklamaları ve menü öğeleri (yemek adları/açıklamaları) üzerinde çalışan **Fuzzy Arama** (Bulanık Arama).
  - Klavyeden hızlı yazma esnasında gereksiz filtrelemeleri önlemek için 300 ms debounced arama girdisi.
  - Restoranları Puan (⭐), Teslimat Süresi (🕐) ve Teslimat Ücretine (🚚) göre sıralayan hızlı filtreleme butonları.
  - Kategori çiplerine tıklandığında ilgili kategoriye ait restoranları listeleme.
- **Restoran Detay ve Menü Görüntüleme:**
  - Floating geri butonu ile restoran kapak resmi.
  - Restoran çalışma durumu (Açık/Kapalı), ortalama puanı ve toplam yorum sayısı gösterimi.
  - Web ve Native platformlar için optimize edilmiş Google Haritalar önizlemesi.
  - Menü kategorilerine göre yatay sekmeli filtreleme.
  - Menü elemanlarını sepete ekleme ve sepet miktar kontrolleri.
- **Sepet Yönetimi:**
  - Farklı restorandan ürün eklenmeye çalışıldığında sepet sıfırlama uyarısı ve onay mekanizması.
  - Sepet subtotal, kademeli teslimat ücreti (150 TL üzeri ücretsiz, 100 TL üzeri 5 TL, 100 TL altı 10 TL) ve toplam tutarın anlık hesabı.
  - Zustand AsyncStorage persist sayesinde sepet verilerinin uygulama kapatılsa dahi korunması.
- **Ödeme ve Sipariş Simülasyonu:**
  - Kredi kartı formu (Kart Numarası, Kart Sahibi, Son Kullanma Tarihi, CVV).
  - Kart numarası (4'lü gruplar halinde) ve son kullanma tarihi (MM/YY) için otomatik formatlama.
  - 2 saniyelik mock ödeme işlemi simülasyonu.
  - Reanimated ile oluşturulmuş, sipariş başarıyla tamamlandığında tetiklenen animasyonlu kutlama ekranı.
- **Sipariş Takibi ve Durum Değişikliği:**
  - Canlı harita üzerinde müşteri, restoran ve kurye konumlarını gösteren işaretçiler (kurye sadece sipariş 'Yolda' iken görünür).
  - Harita üzerinde tahmini varış süresi (ETA) gösterimi.
  - 4 adımlı durum çubuğu (Onaylandı, Hazırlanıyor, Yolda, Teslim Edildi) ve simüle edilmiş otomatik sipariş ilerleme döngüsü.
- **Puanlama ve Yorum Sistemi:**
  - Teslim edilmiş siparişler için "Siparişi Değerlendir" butonu.
  - Bottom-sheet modal ile 5 yıldızlı puanlama ve metin yorumu gönderme.
  - Aynı sipariş için birden fazla yorum yapılmasını engelleyen kontrol sistemi.
  - Restoran detay sayfasında en son yapılan 3 yorumun listelenmesi.

### 🏪 Restoran Paneli
- **Dashboard:**
  - Restoran sahibi adı ile kişiselleştirilmiş karşılama.
  - 4 Temel KPI Kartı: Günlük Sipariş Sayısı, Günlük Gelir, Aktif Siparişler, Toplam Gelir.
  - Son 7 günün gelirini gösteren haftalık dikey sütun grafiği.
  - Son 3 gelen siparişin özet görünümü.
- **Sipariş Yönetimi:**
  - Aktif Siparişler ve Geçmiş Siparişler sekmeleri.
  - Sipariş detayları, adetleri ve sipariş durumu renkli rozetleri.
  - Sipariş aşamasını (Onaylandı -> Hazırlanıyor -> Yolda -> Teslim Edildi) tek tıkla ilerleten dinamik durum güncelleme butonları.
- **Menü Yönetimi:**
  - Restorana ait menü elemanlarının fiyat, kategori ve stok durumu ile listelenmesi.
  - Ürün stok durumu anahtarı (Switch) - ürün tükendiğinde menüde soluklaşma ve sepete eklenmesinin engellenmesi.
  - Menüye yeni ürün ekleme, var olan ürünü düzenleme (fiyat sayısal girdisi doğrulamalı) ve ürün silme işlemleri.

### 🌐 Genel & Altyapı
- **Kalıcı Durum (State Persistence):** Auth, Settings ve Cart store'ları Zustand persist middleware ile AsyncStorage üzerinde saklanır. Splash Screen, veri geri yüklenene (hydration) kadar açık kalarak ekran titremesini (flicker) engeller.
- **Çoklu Dil Desteği:** Türkçe ve İngilizce dilleri arasında anlık geçiş imkanı (i18n ve react-i18next).
- **Karanlık Mod:** Uygulama genelinde açık/karanlık mod desteği ve sistem temasına göre otomatik uyum.
- **Platform Bazlı Harita:** Metro Extension Routing sayesinde Native platformlarda `react-native-maps`, Web tarayıcısında ise `@react-google-maps/api` kullanılır.

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Versiyon | Açıklama |
|---|---|---|
| **React Native** | 0.86.0 | Mobil Uygulama Geliştirme Çatısı |
| **Expo SDK** | 57.0.16 | Geliştirme ve Build Platformu |
| **Expo Router** | 57.0.4 | Dosya Tabanlı Yönlendirme (Typed Routes) |
| **TypeScript** | 6.0.3 | Tip Güvenli JavaScript Geliştirme |
| **Zustand** | 5.0.14 | State Management & Persistence |
| **TanStack React Query** | 5.101.2 | Server State & Cache Management |
| **React Native Reanimated**| 4.5.0 | Yüksek Performanslı Animasyonlar |
| **i18next** | 26.3.6 | Çoklu Dil Altyapısı |
| **AsyncStorage** | 2.2.0 | Yerel Veri Depolama (Zustand Entegre) |
| **Jest & ts-jest** | 29.7.0 / 29.4.12 | Birim Test Altyapısı |

---

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js >= 18
- npm veya yarn
- Expo Go uygulaması (mobil cihazda test etmek için) ya da kurulu iOS/Android emülatörü.

### Adımlar

1. **Depoyu Klonlayın ve Klasöre Geçin:**
   ```bash
   git clone https://github.com/eminnyildiz/foodchain.git
   cd foodchain
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Çevre Değişkenlerini Tanımlayın:**
   Proje kök dizininde `.env` dosyası oluşturun ve Google Haritalar API anahtarınızı ekleyin:
   ```env
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
   ```

4. **Uygulamayı Başlatın:**
   ```bash
   # Expo geliştirici sunucusunu başlatır
   npm start
   
   # Belirli platformlarda doğrudan çalıştırmak için:
   npm run android  # Android emülatör/cihaz
   npm run ios      # iOS emülatör/cihaz
   npm run web      # Tarayıcı (Web platformu)
   ```

---

## 🧪 Testleri Çalıştırma

FoodChain projesinde Zustand store'ları ve yardımcı biçimlendirici fonksiyonlar için kapsamlı bir birim test (unit test) seti bulunmaktadır. Testler Jest ve ts-jest kullanılarak yazılmıştır.

Testleri çalıştırmak için şu komutu yürütün:
```bash
npm test
```

**Test Kapsamı:**
- `helpers.test.ts`: Bulanık arama algoritması, debouncing ve diğer yardımcıların testleri.
- `formatters.test.ts`: Para birimi biçimlendirme, tarih hesaplamaları ve telefon doğrulamalarının testleri.
- `authStore.test.ts`: Kullanıcı girişi, kayıt, demo hesap yetkilendirmesi ve çıkış yapma durumlarının testleri.
- `settingsStore.test.ts`: Dil değiştirme, karanlık mod anahtarı ve bildirim ayarlarının kalıcı saklanma testleri.
- `cartStore.test.ts`: Ürün ekleme/çıkarma, miktar artırma/azaltma, sepet temizleme ve teslimat ücreti hesaplama testleri.

---

## 📁 Proje Dizin Yapısı

```
src/
├── app/                      # Expo Router Dosya Tabanlı Navigasyon
│   ├── (auth)/               # Giriş, Kayıt, Şifre Sıfırlama ekranları
│   ├── (customer)/           # Müşteri Arayüzü
│   │   ├── (tabs)/           # Alt sekmeler (Ana Sayfa, Arama, Siparişler, Profil)
│   │   ├── restaurant/       # Restoran Detay Sayfası [id].tsx
│   │   ├── tracking/         # Sipariş Canlı Takip Ekranı [orderId].tsx
│   │   ├── cart.tsx          # Sepet Ekranı
│   │   └── checkout.tsx      # Ödeme ve Sipariş Onay Ekranı
│   └── (restaurant)/         # Restoran Arayüzü
│       └── (tabs)/           # Alt sekmeler (Dashboard, Sipariş Yönetimi, Menü Yönetimi, Ayarlar)
├── components/               # Paylaşılan UI ve Harita Bileşenleri
│   ├── Map.native.tsx        # Native platformlar için Google Harita bileşeni
│   ├── Map.web.tsx           # Web platformu için Google Harita bileşeni
│   └── ui/                   # Butonlar, Kartlar vb. atomik UI bileşenleri
├── constants/                # Tema renkleri ve sabitler
├── data/                     # İlk veritabanı kurulumu için demo restoran ve yemek verileri
├── hooks/                    # Custom React Hook'ları
├── i18n/                     # Çoklu dil çevirileri (tr.json, en.json)
├── store/                    # Zustand Store'ları (auth, settings, cart, reviews, orders)
├── types/                    # SDD uyumlu TypeScript tip tanımlamaları
└── utils/                    # Formatlayıcılar ve arama yardımcı fonksiyonları
```

---

## 👥 Demo Kullanıcı Bilgileri

Uygulamayı hızlıca test edebilmek için önceden tanımlanmış demo hesapları kullanabilirsiniz:

| Rol | E-posta | Şifre |
|---|---|---|
| 🛒 **Müşteri** | `customer@test.com` | `123456` |
| 🏪 **Restoran** | `restaurant@test.com` | `123456` |

---

## 🏗️ EAS Build & Yayınlama

Uygulamayı derlemek ve marketlere göndermek için EAS CLI kullanabilirsiniz.

```bash
# EAS CLI kurulumu
npm install -g eas-cli

# EAS oturumu açın
eas login

# EAS projesini yapılandırın
eas build:configure

# Android Production AAB Build oluşturma
eas build --platform android --profile production

# iOS Production IPA Build oluşturma
eas build --platform ios --profile production
```

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
Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.
