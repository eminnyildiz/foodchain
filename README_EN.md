# 🍔 FoodChain — Food Delivery Application

FoodChain is a modern, cross-platform (iOS, Android, Web) food delivery application built using React Native and Expo SDK 57. It provides separate, dedicated user interfaces and portals for both customers and restaurant managers. The system architecture, data models, and feature sets have been designed and implemented in 100% compliance with the Software Design Document (SDD) requirements.

---

## 📱 Key Features

### 🛒 Customer Panel
- **Authentication & Registration:**
  - Secure credential-based login using email and password.
  - Support for sending password reset emails.
  - Registration form with first name, last name, email, phone number, and role selection (Customer or Restaurant Manager).
  - Strict input validations (valid email format, password length >= 6 characters, phone number formatting, and validations).
  - Persistent authentication state managed using Zustand and AsyncStorage.
- **Home & Discovery:**
  - Time-of-day-based personalized greeting (Good Morning, Good Afternoon, Good Evening).
  - Dynamic display of the user's default delivery address.
  - Navigation across 14 food categories (Pizza, Burger, Sushi, Kebab, Dessert, Drink, Salad, Chicken, Seafood, Turkish Cuisine, Fast Food, Healthy, Breakfast, Coffee).
  - A horizontal "Featured Restaurants" carousel showcasing the top 5 restaurants.
  - A vertical "Nearby Restaurants" list showing all 15 active restaurants.
- **Enhanced Search & Filtering:**
  - **Fuzzy Search** algorithm working across restaurant names, descriptions, and individual menu items (dish names and descriptions) with relevance-based ranking.
  - 300ms input debouncing to prevent excessive re-renders/filters during rapid typing.
  - Quick filter buttons to sort restaurants by Rating (⭐), Delivery Time (🕐), and Delivery Fee (🚚).
  - Category filter chips that restrict results to a specific food type.
- **Restaurant Details & Menu:**
  - Restaurant cover image hero section with a floating back button.
  - Display of real-time restaurant status (Open/Closed), average rating, and total reviews.
  - Responsive Google Maps preview, tailored for Web (via `@react-google-maps/api`) and Native (via `react-native-maps`).
  - Menu category tab bar filters (horizontal scroll).
  - Adding menu items to the cart with reactive quantity selectors.
- **Cart Management:**
  - Cross-restaurant cart conflict alert offering the choice to clear the existing cart or cancel.
  - Live calculation of subtotal, tiered delivery fees (Free for orders >= 150 TL, 5 TL for orders >= 100 TL, and 10 TL for orders < 100 TL), and grand total.
  - Cart persistence using Zustand AsyncStorage middleware.
- **Checkout & Payment:**
  - Delivery address confirmation from the user profile.
  - Credit card checkout form with auto-formatting for card numbers (grouped by 4 digits) and expiry date (MM/YY).
  - CVV masking (3 digits).
  - Simulated 2-second payment processing.
  - Animated celebration screen built using Reanimated upon order success.
- **Order Tracking:**
  - Live simulation map tracking customer, restaurant, and courier locations (courier appears only when order status is "On the Way").
  - Map overlay displaying estimated time of arrival (ETA) and current status.
  - 4-step progress tracker (Confirmed -> Preparing -> On the Way -> Delivered) with simulated automatic transition intervals.
- **Reviews & Ratings:**
  - "Rate Order" feedback button for delivered orders.
  - Bottom-sheet rating modal with 5-star selector and text comment.
  - Backend safeguard preventing duplicate review submissions for the same order.
  - Display of the latest 3 reviews on the restaurant detail page.

### 🏪 Restaurant Panel
- **Dashboard:**
  - Personalized greeting with the restaurant owner's name.
  - 4 Key KPI metrics: Today's Orders, Today's Revenue, Active Orders, and Total Lifetime Revenue.
  - Weekly earnings vertical bar chart showing the last 7 days.
  - Summary list of the top 3 most recent incoming orders.
- **Order Management:**
  - Split tabs for Active and Completed orders.
  - Order card summaries including items, quantities, and status badges.
  - Single-click action buttons to advance the order lifecycle (Pending -> Confirmed -> Preparing -> On the Way -> Delivered).
- **Menu Management:**
  - Interactive menu item listing including price, category, and availability.
  - Availability toggle (Switch) - disabling an item dims it in the menu and blocks customers from ordering it.
  - Modals to add new items and edit existing ones (featuring numeric-only price validations and category selectors).
  - Delete menu item functionality.

### 🌐 Cross-Cutting Concerns
- **State Persistence:** User login, settings, and cart are persistent. A splash screen hydration guard ensures the application UI only mounts after stored states are loaded, avoiding login-flickering.
- **Localization:** Full Turkish and English translations with instant switching (via i18next and react-i18next).
- **Dark Mode:** Adaptive light/dark theming supporting manual switches and system preferences.
- **Platform-Specific Maps:** Unified map interface using native Google Maps via Metro configuration overrides on Web vs. Native.

---

## 🛠️ Tech Stack

| Technology | Version | Description |
|---|---|---|
| **React Native** | 0.86.0 | Cross-platform Mobile Framework |
| **Expo SDK** | 57.0.16 | Development and Build Platform |
| **Expo Router** | 57.0.4 | Typed File-based Navigation Router |
| **TypeScript** | 6.0.3 | Strict Type-safe Coding |
| **Zustand** | 5.0.14 | Global State Management & Persistence |
| **TanStack React Query** | 5.101.2 | Server Cache & Query State Manager |
| **React Native Reanimated** | 4.5.0 | High-performance Native Animations |
| **i18next** | 26.3.6 | Translation and Internationalization |
| **AsyncStorage** | 2.2.0 | Local Storage for State Persistence |
| **Jest & ts-jest** | 29.7.0 / 29.4.12 | Unit Testing Framework |

---

## 🚀 Installation & Running

### Requirements
- Node.js >= 18
- npm or yarn
- Expo Go app on a mobile device or a pre-configured iOS/Android emulator.

### Steps

1. **Clone the Repository & Navigate to Folder:**
   ```bash
   git clone https://github.com/eminnyildiz/foodchain.git
   cd foodchain
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root folder and add your Google Maps API key:
   ```env
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
   ```

4. **Start the Development Server:**
   ```bash
   # Starts the Expo developer portal
   npm start
   
   # Or run directly on specific platforms:
   npm run android  # For Android device/emulator
   npm run ios      # For iOS device/emulator
   npm run web      # For Web browser rendering
   ```

---

## 🧪 Running Unit Tests

The FoodChain project contains a comprehensive unit test suite covering Zustand stores and formatter/helper utility functions. Tests are built on top of Jest and ts-jest.

Run the test suite using:
```bash
npm test
```

**Testing Coverage:**
- `helpers.test.ts`: Validates fuzzy search ranking, debouncing, and scoring.
- `formatters.test.ts`: Validates currency formats, relative time intervals, and phone inputs.
- `authStore.test.ts`: Validates login, registration, demo accounts, and logout state updates.
- `settingsStore.test.ts`: Validates dark mode toggles, notification preferences, and language hydration.
- `cartStore.test.ts`: Validates item insertions, quantity increment/decrement, cost structures, and tiered delivery fees.

---

## 📁 Directory Structure

```
src/
├── app/                      # Expo Router File-Based Routing
│   ├── (auth)/               # Login, Register, Password Reset screens
│   ├── (customer)/           # Customer user interface
│   │   ├── (tabs)/           # Customer tabs (Home, Search, Orders, Profile)
│   │   ├── restaurant/       # Restaurant Detail [id].tsx
│   │   ├── tracking/         # Live Order Tracking [orderId].tsx
│   │   ├── cart.tsx          # Cart Screen
│   │   └── checkout.tsx      # Checkout and Payment Form
│   └── (restaurant)/         # Restaurant user interface
│       └── (tabs)/           # Restaurant tabs (Dashboard, Orders, Menu, Settings)
├── components/               # Shareable UI and Map Components
│   ├── Map.native.tsx        # Native-specific Google Map wrapper
│   ├── Map.web.tsx           # Web-specific Google Map wrapper
│   └── ui/                   # Reusable atomic UI buttons, cards, list items
├── constants/                # App colors, fonts, and grid themes
├── data/                     # Mock initialization dataset (15 restaurants, menu items)
├── hooks/                    # Custom React Hooks
├── i18n/                     # Language translation dictionaries (tr.json, en.json)
├── store/                    # Zustand persistent stores (auth, settings, cart, reviews, orders)
├── types/                    # SDD-compliant TypeScript type definitions
└── utils/                    # Formatters and search utility helper scripts
```

---

## 👥 Demo Accounts

You can log in instantly to try out both roles using these demo credentials:

| Role | Email | Password |
|---|---|---|
| 🛒 **Customer** | `customer@test.com` | `123456` |
| 🏪 **Restaurant Owner** | `restaurant@test.com` | `123456` |

---

## 🏗️ EAS Build & Deploy

You can configure and generate standard App Store and Google Play builds using EAS.

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in to Expo account
eas login

# Configure project
eas build:configure

# Build Android Production AAB
eas build --platform android --profile production

# Build iOS Production IPA
eas build --platform ios --profile production
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
