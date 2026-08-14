# Software Design Document - Part 1: FoodChain

## Table of Contents
- [Section 1: Document Overview & Project Definition](#section-1-document-overview--project-definition)
- [Section 2: MVP Requirements List](#section-2-mvp-requirements-list)
  - [2.1 Authentication & Authorization](#21-authentication--authorization)
  - [2.2 Customer - Home & Discovery](#22-customer---home--discovery)
  - [2.3 Customer - Search & Filtering](#23-customer---search--filtering)
  - [2.4 Customer - Restaurant Detail](#24-customer---restaurant-detail)
  - [2.5 Customer - Cart Management](#25-customer---cart-management)
  - [2.6 Customer - Checkout & Payment](#26-customer---checkout--payment)
  - [2.7 Customer - Order Management](#27-customer---order-management)
  - [2.8 Customer - Order Tracking](#28-customer---order-tracking)
  - [2.9 Customer - Profile & Settings](#29-customer---profile--settings)
  - [2.10 Restaurant Panel - Dashboard](#210-restaurant-panel---dashboard)
  - [2.11 Restaurant Panel - Order Management](#211-restaurant-panel---order-management)
  - [2.12 Restaurant Panel - Menu Management](#212-restaurant-panel---menu-management)
  - [2.13 Restaurant Panel - Settings](#213-restaurant-panel---settings)
  - [2.14 Cross-Cutting Concerns](#214-cross-cutting-concerns)
- [Section 3: System Architecture](#section-3-system-architecture)
  - [3.1 High-Level Architecture Diagram](#31-high-level-architecture-diagram)
  - [3.2 Directory Structure](#32-directory-structure)
  - [3.3 Navigation Architecture](#33-navigation-architecture)
  - [3.4 State Management Architecture](#34-state-management-architecture)
- [Section 4: Data Models](#section-4-data-models)
- [Section 5: API Design](#section-5-api-design)
  - [5.1 Internal State APIs (Zustand Store Actions)](#51-internal-state-apis-zustand-store-actions)
  - [5.2 External Service Integrations](#52-external-service-integrations)
  - [5.3 Utility Functions API](#53-utility-functions-api)

---

## Section 1: Document Overview & Project Definition

### Purpose, Scope, Audience
This document serves as the primary Software Design Document (SDD) for the FoodChain project. It details the system architecture, requirements, data models, and API interfaces. The intended audience includes software engineers, QA testers, UI/UX designers, and project managers involved in the development lifecycle.

> [!IMPORTANT]  
> This is Part 1 of the SDD. It covers Sections 1 through 5, focusing on project definition, requirements, architecture, data models, and internal APIs. Part 2 will cover the remaining sections.

### Project Details
- **Project Name:** FoodChain
- **Project Description:** A cross-platform (iOS, Android, Web) food delivery application built with React Native and Expo SDK 57.
- **Vision:** To establish a premium food delivery platform connecting customers with local restaurants in Istanbul, Turkey, prioritizing user experience and performance.
- **Target Platforms:** iOS, Android, Web (static rendering)

### Tech Stack Summary

| Technology | Detail |
| --- | --- |
| **Framework** | React Native 0.86.0 with Expo SDK 57.0.4 |
| **Navigation** | Expo Router (file-based, typed routes, static web rendering) |
| **State Management** | Zustand 5.0.14 |
| **Data Fetching** | TanStack React Query 5.101.2 |
| **Internationalization** | i18next 26.3.6 + react-i18next 17.0.9 |
| **Maps** | react-native-maps 1.27.2 (native) + @react-google-maps/api 2.20.8 (web) |
| **Backend** | Firebase (Auth, Firestore, Storage) via @react-native-firebase |
| **Monetization** | Google Mobile Ads |
| **Styling** | React Native StyleSheet with custom theme system (light/dark mode) |
| **Language** | TypeScript 6.0.3 |
| **Animations** | react-native-reanimated 4.5.0 |

---

## Section 2: MVP Requirements List

### 2.1 Authentication & Authorization
- **REQ-AUTH-001:** User registration with name, surname, email, phone, password, role selection (customer/restaurant).
- **REQ-AUTH-002:** User login with email/password credentials.
- **REQ-AUTH-003:** Password reset via email.
- **REQ-AUTH-004:** Role-based routing (customer -> customer tabs, restaurant -> restaurant tabs).
- **REQ-AUTH-005:** Persistent authentication state.
- **REQ-AUTH-006:** Logout functionality clearing all user state.
- **REQ-AUTH-007:** Demo account support (`customer@test.com`, `restaurant@test.com`).
- **REQ-AUTH-008:** Input validation (email format, password length >= 6, password confirmation match, phone format).

### 2.2 Customer - Home & Discovery
- **REQ-DISC-001:** Personalized greeting based on time of day (morning/afternoon/evening).
- **REQ-DISC-002:** Display user's default delivery address.
- **REQ-DISC-003:** Category browsing with 14 food categories (Pizza, Burger, Sushi, Kebab, Dessert, Drink, Salad, Chicken, Seafood, Turkish Cuisine, Fast Food, Healthy, Breakfast, Coffee).
- **REQ-DISC-004:** Featured restaurants horizontal carousel (top 5).
- **REQ-DISC-005:** Nearby restaurants vertical list (all 15 restaurants).
- **REQ-DISC-006:** Restaurant cards showing name, rating, delivery time, delivery fee, free delivery badge.
- **REQ-DISC-007:** Cart icon with badge counter in header.
- **REQ-DISC-008:** Search bar placeholder navigating to search screen.

### 2.3 Customer - Search & Filtering
- **REQ-SRCH-001:** Real-time text search across restaurant names, descriptions.
- **REQ-SRCH-002:** Menu item search matching dish names and descriptions.
- **REQ-SRCH-003:** Category chip filter bar (horizontal scrollable).
- **REQ-SRCH-004:** Deep linking support (category query parameter from home).
- **REQ-SRCH-005:** Empty state display when no results found.
- **REQ-SRCH-006:** Combined results showing both matching dishes and restaurants.

### 2.4 Customer - Restaurant Detail
- **REQ-REST-001:** Restaurant cover image hero with floating back button.
- **REQ-REST-002:** Restaurant info card (name, description, rating, review count, delivery time, delivery fee, open/closed status).
- **REQ-REST-003:** Google Maps preview showing restaurant location.
- **REQ-REST-004:** Menu category horizontal filter tabs.
- **REQ-REST-005:** Menu items list with image, name, description, price, add-to-cart button.
- **REQ-REST-006:** Add to cart with quantity indicator on button.
- **REQ-REST-007:** Cross-restaurant cart conflict resolution (Alert confirmation to clear existing cart).
- **REQ-REST-008:** Floating cart bar showing item count and total price.

### 2.5 Customer - Cart Management
- **REQ-CART-001:** Display cart items with image, name, price, quantity selector.
- **REQ-CART-002:** Quantity increase/decrease with `QuantitySelector` component.
- **REQ-CART-003:** Individual item removal (X button and decrement to zero).
- **REQ-CART-004:** Clear entire cart functionality.
- **REQ-CART-005:** Price summary (subtotal, delivery fee, total).
- **REQ-CART-006:** Tiered delivery fee calculation (>=150 free, >=100 -> 5TL, <100 -> 10TL).
- **REQ-CART-007:** Restaurant name display.
- **REQ-CART-008:** Empty cart state with illustration.
- **REQ-CART-009:** Checkout navigation button with total price.

### 2.6 Customer - Checkout & Payment
- **REQ-CHKT-001:** Delivery address display from user profile.
- **REQ-CHKT-002:** Credit card form (card number, holder, expiry, CVV).
- **REQ-CHKT-003:** Card number auto-formatting (groups of 4 digits).
- **REQ-CHKT-004:** Expiry date auto-formatting (MM/YY).
- **REQ-CHKT-005:** CVV masked input (3 digits).
- **REQ-CHKT-006:** Order summary with subtotal, delivery fee, total.
- **REQ-CHKT-007:** Place order with 2-second simulated processing.
- **REQ-CHKT-008:** Order success modal with celebration animation.
- **REQ-CHKT-009:** Navigate to order tracking from success modal.

### 2.7 Customer - Order Management
- **REQ-ORD-001:** Order list screen with active and past order sections.
- **REQ-ORD-002:** Order cards showing restaurant image, name, item count, total, date, status badge.
- **REQ-ORD-003:** Status badge with color variants (pending=warning, confirmed=info, preparing=primary, onTheWay=info, delivered=success, cancelled=error).
- **REQ-ORD-004:** Empty state when no orders exist.
- **REQ-ORD-005:** Navigation to order tracking from order card.
- **REQ-ORD-006:** Active order count badge on tab bar icon.

### 2.8 Customer - Order Tracking
- **REQ-TRACK-001:** Live map with restaurant, customer, and courier markers.
- **REQ-TRACK-002:** Conditional courier marker (only when status is 'onTheWay').
- **REQ-TRACK-003:** Map overlay showing current status text.
- **REQ-TRACK-004:** ETA badge with estimated minutes.
- **REQ-TRACK-005:** Progress stepper with 4 steps (confirmed, preparing, onTheWay, delivered).
- **REQ-TRACK-006:** Visual step completion indicators (dot size, color, connecting lines).
- **REQ-TRACK-007:** Simulated order progression (pending->confirmed 5s, confirmed->preparing 10s, preparing->onTheWay 15s, onTheWay->delivered 12s).
- **REQ-TRACK-008:** Order details breakdown (items, quantities, prices, total).

### 2.9 Customer - Profile & Settings
- **REQ-PROF-001:** User avatar with initials.
- **REQ-PROF-002:** Display user name, surname, email.
- **REQ-PROF-003:** Language toggle (Turkish/English) with flag emoji.
- **REQ-PROF-004:** Dark mode toggle with Switch component.
- **REQ-PROF-005:** Notifications toggle.
- **REQ-PROF-006:** My Addresses placeholder.
- **REQ-PROF-007:** Settings placeholder.
- **REQ-PROF-008:** Logout button (danger variant).
- **REQ-PROF-009:** App version display (FoodChain v1.0.0).

### 2.10 Restaurant Panel - Dashboard
- **REQ-DASH-001:** Greeting with restaurant owner name.
- **REQ-DASH-002:** 4 KPI stat cards (today's orders, today's revenue, active orders, total revenue).
- **REQ-DASH-003:** Weekly bar chart visualization (7 days, proportional heights).
- **REQ-DASH-004:** Recent incoming orders list (top 3) with order ID, item count, total.

### 2.11 Restaurant Panel - Order Management
- **REQ-RORD-001:** Filter tabs (active/completed).
- **REQ-RORD-002:** Order cards with ID, status badge, item details, total.
- **REQ-RORD-003:** Update status button advancing order lifecycle (pending->confirmed->preparing->onTheWay->delivered).
- **REQ-RORD-004:** Status badge color mapping.

### 2.12 Restaurant Panel - Menu Management
- **REQ-MENU-001:** Menu items list with image, name, category, price.
- **REQ-MENU-002:** Availability toggle (Switch) with visual dimming.
- **REQ-MENU-003:** Delete menu item.
- **REQ-MENU-004:** Add new menu item via modal form (name, description, price, category).
- **REQ-MENU-005:** Edit existing menu item via modal form.
- **REQ-MENU-006:** Numeric-only price input validation.

### 2.13 Restaurant Panel - Settings
- **REQ-RSET-001:** Restaurant profile card (avatar, name, email).
- **REQ-RSET-002:** Language toggle.
- **REQ-RSET-003:** Dark mode toggle.
- **REQ-RSET-004:** Version display.
- **REQ-RSET-005:** Logout button.

### 2.14 Cross-Cutting Concerns
- **REQ-CC-001:** Internationalization (Turkish + English) with 15 namespace groups.
- **REQ-CC-002:** Dark mode / Light mode theming across all screens.
- **REQ-CC-003:** Platform-specific map rendering (react-native-maps for native, @react-google-maps/api for web).
- **REQ-CC-004:** Responsive layouts across phone, tablet, and web.
- **REQ-CC-005:** Safe area handling for notched devices.
- **REQ-CC-006:** Keyboard avoidance on form screens.
- **REQ-CC-007:** Static web rendering for SEO.

---

## Section 3: System Architecture

### 3.1 High-Level Architecture Diagram

```mermaid
architecture-beta
    group clientApp(Client App - React Native)
    group navigation(Expo Router)
    group stores(Zustand Stores)
    group backend(Firebase Backend)
    group services(Services)
    
    service ui(UI/UX Components) in clientApp
    service router(File-Based Routing) in navigation
    service authStore(authStore) in stores
    service cartStore(cartStore) in stores
    service orderStore(orderStore) in stores
    service settingsStore(settingsStore) in stores
    service firebaseAuth(Authentication) in backend
    service firestore(Firestore) in backend
    service storage(Storage) in backend
    
    service i18n(i18n System) in services
    service theme(Theme System) in services
    service map(Map System Native/Web) in services

    ui:R --> L:router
    ui:R --> L:authStore
    ui:R --> L:cartStore
    ui:R --> L:orderStore
    ui:R --> L:settingsStore
    
    ui:T --> B:i18n
    ui:T --> B:theme
    ui:T --> B:map
    
    authStore:R --> L:firebaseAuth
    orderStore:R --> L:firestore
    cartStore:R --> L:firestore
```

> [!NOTE]
> The diagram illustrates the unidirectional data flow and modular decoupling between the UI layer, Navigation, and State Stores.

### 3.2 Directory Structure

```text
src/
â”œâ”€â”€ app/                    # Expo Router screens
â”‚   â”œâ”€â”€ _layout.tsx         # Root layout with auth guard
â”‚   â”œâ”€â”€ (auth)/             # Authentication flow
â”‚   â”‚   â”œâ”€â”€ _layout.tsx
â”‚   â”‚   â”œâ”€â”€ login.tsx
â”‚   â”‚   â”œâ”€â”€ register.tsx
â”‚   â”‚   â””â”€â”€ forgot-password.tsx
â”‚   â”œâ”€â”€ (customer)/         # Customer flow
â”‚   â”‚   â”œâ”€â”€ _layout.tsx
â”‚   â”‚   â”œâ”€â”€ (tabs)/
â”‚   â”‚   â”‚   â”œâ”€â”€ _layout.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ index.tsx   # Home/Explore
â”‚   â”‚   â”‚   â”œâ”€â”€ search.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ orders.tsx
â”‚   â”‚   â”‚   â””â”€â”€ profile.tsx
â”‚   â”‚   â”œâ”€â”€ restaurant/[id].tsx
â”‚   â”‚   â”œâ”€â”€ cart.tsx
â”‚   â”‚   â”œâ”€â”€ checkout.tsx
â”‚   â”‚   â””â”€â”€ tracking/[orderId].tsx
â”‚   â””â”€â”€ (restaurant)/       # Restaurant panel
â”‚       â”œâ”€â”€ _layout.tsx
â”‚       â””â”€â”€ (tabs)/
â”‚           â”œâ”€â”€ _layout.tsx
â”‚           â”œâ”€â”€ dashboard.tsx
â”‚           â”œâ”€â”€ orders.tsx
â”‚           â”œâ”€â”€ menu.tsx
â”‚           â””â”€â”€ settings.tsx
â”œâ”€â”€ components/             # Reusable UI components
â”‚   â”œâ”€â”€ Map.tsx             # Native map component
â”‚   â”œâ”€â”€ Map.web.tsx         # Web map component
â”‚   â””â”€â”€ ui/
â”‚       â”œâ”€â”€ Badge.tsx
â”‚       â”œâ”€â”€ Button.tsx
â”‚       â”œâ”€â”€ Card.tsx
â”‚       â”œâ”€â”€ EmptyState.tsx
â”‚       â”œâ”€â”€ Input.tsx
â”‚       â”œâ”€â”€ QuantitySelector.tsx
â”‚       â””â”€â”€ SearchBar.tsx
â”œâ”€â”€ store/                  # Zustand state stores
â”‚   â”œâ”€â”€ authStore.ts
â”‚   â”œâ”€â”€ cartStore.ts
â”‚   â”œâ”€â”€ orderStore.ts
â”‚   â””â”€â”€ settingsStore.ts
â”œâ”€â”€ types/
â”‚   â””â”€â”€ index.ts
â”œâ”€â”€ data/                   # Demo/mock data
â”‚   â”œâ”€â”€ categories.ts
â”‚   â”œâ”€â”€ menuItems.ts
â”‚   â”œâ”€â”€ orders.ts
â”‚   â””â”€â”€ restaurants.ts
â”œâ”€â”€ hooks/
â”‚   â””â”€â”€ useTheme.ts
â”œâ”€â”€ utils/
â”‚   â”œâ”€â”€ formatters.ts
â”‚   â””â”€â”€ helpers.ts
â”œâ”€â”€ constants/
â”‚   â”œâ”€â”€ theme.ts
â”‚   â””â”€â”€ config.ts
â”œâ”€â”€ services/
â”‚   â””â”€â”€ ads.tsx
â””â”€â”€ i18n/
    â”œâ”€â”€ index.ts
    â”œâ”€â”€ tr.json
    â””â”€â”€ en.json
```

### 3.3 Navigation Architecture

The application relies on **Expo Router** for file-based navigation.
- **Root Layout (`_layout.tsx`)**: Acts as the primary authentication guard. It observes the `isAuthenticated` state and `user.role` from the `authStore` to redirect users automatically.
- **Auth Group (`(auth)/`)**: Contains the Stack navigation for unauthenticated flows, including login, register, and forgot-password screens.
- **Customer Group (`(customer)/`)**: Encapsulates the user-facing application flow. It contains a tab navigator (`(tabs)/`) for primary views (Home/index, Search, Orders, Profile) and additional modal/stack screens for deep flows (restaurant detail, cart, checkout, order tracking).
- **Restaurant Group (`(restaurant)/`)**: Encapsulates the restaurant owner panel flow. It contains a tab navigator for primary restaurant management views (Dashboard, Orders, Menu, Settings).

### 3.4 State Management Architecture

State is managed centrally via **Zustand**, split into logical domains to prevent monolith stores and improve rendering performance:
- **`authStore`**: Manages user session state, credentials, login/register/logout workflows, and profile information updates.
- **`cartStore`**: Manages cart state. Enforces a single-restaurant restriction (prompting the user to clear the cart if items from a new restaurant are added), manages item quantities, and calculates subtotals, tiered delivery fees, and totals.
- **`orderStore`**: Handles order creation, manages the local collection of orders, performs simulated order lifecycle progression, and provides filtering mechanisms for active vs. past orders.
- **`settingsStore`**: Manages user preferences such as active language, dark/light mode configurations, and notification toggles.

---

## Section 4: Data Models

The following TypeScript models, located in `src/types/index.ts`, form the core entity relationships of FoodChain.

| Model | Field | Type | Description |
| --- | --- | --- | --- |
| **UserRole** | - | `'customer' \| 'restaurant' \| 'admin'` | Defines access level and routing path for users. |
| **Address** | `id` | `string` | Unique identifier for the address. |
| | `title` | `string` | User-defined title (e.g., Home, Work). |
| | `street` | `string` | Street name and number. |
| | `city` | `string` | City name. |
| | `district` | `string` | District or neighborhood. |
| | `postalCode` | `string` | Postal code. |
| | `coordinates` | `{ lat: number, lng: number }` | Geolocational coordinates. |
| | `isDefault` | `boolean` | Flag indicating default delivery address. |
| **User** | `id` | `string` | Unique user identifier. |
| | `email` | `string` | User email address. |
| | `firstName` | `string` | User's first name. |
| | `lastName` | `string` | User's last name. |
| | `phone` | `string` | User's contact number. |
| | `role` | `UserRole` | The role assigned to the user. |
| | `addresses` | `Address[]` | List of user's saved addresses. |
| **WorkingHours** | `open` | `string` | Opening time in HH:mm format. |
| | `close` | `string` | Closing time in HH:mm format. |
| **Restaurant** | `id` | `string` | Unique identifier. |
| | `name` | `string` | Restaurant name. |
| | `description` | `string` | Brief description or slogan. |
| | `coverImage` | `string` | URL to cover image. |
| | `rating` | `number` | Aggregate rating score (0.0 - 5.0). |
| | `reviewCount` | `number` | Total number of reviews. |
| | `deliveryTime` | `string` | Estimated delivery time string (e.g., "20-30 min"). |
| | `deliveryFee` | `number` | Base delivery fee in TL. |
| | `minOrderAmount` | `number` | Minimum cart amount required for delivery. |
| | `categories` | `string[]` | List of category IDs the restaurant belongs to. |
| | `workingHours` | `WorkingHours` | Operating hours. |
| | `isOpen` | `boolean` | Current operational status. |
| | `coordinates` | `{ lat: number, lng: number }` | Geolocation of the restaurant. |
| **Category** | `id` | `string` | Unique category identifier. |
| | `name` | `string` | Display name of the category. |
| | `icon` | `string` | Icon or image URL for the category. |
| **MenuItemOption** | `id` | `string` | Unique option identifier. |
| | `name` | `string` | Option name (e.g., "Extra Cheese"). |
| | `price` | `number` | Additional cost for this option. |
| **MenuItem** | `id` | `string` | Unique item identifier. |
| | `restaurantId` | `string` | Foreign key to `Restaurant`. |
| | `categoryId` | `string` | Foreign key to `Category`. |
| | `name` | `string` | Item name. |
| | `description` | `string` | Item description. |
| | `price` | `number` | Base price in TL. |
| | `image` | `string` | URL to item image. |
| | `isAvailable` | `boolean` | Stock availability flag. |
| | `options` | `MenuItemOption[]` | Customization options. |
| **CartItem** | `id` | `string` | Unique identifier for cart line item. |
| | `menuItem` | `MenuItem` | The item added to cart. |
| | `quantity` | `number` | Quantity selected. |
| | `selectedOptions` | `MenuItemOption[]` | User-selected customizations. |
| | `note` | `string` | Optional instruction note. |
| **OrderStatus** | - | `'pending' \| 'confirmed' \| 'preparing' \| 'onTheWay' \| 'delivered' \| 'cancelled'` | State machine values for an order lifecycle. |
| **PaymentInfo** | `method` | `'credit_card' \| 'cash_on_delivery'` | Payment method. |
| | `last4` | `string` | Masked card digits if applicable. |
| **Order** | `id` | `string` | Unique order identifier. |
| | `userId` | `string` | Customer's ID. |
| | `restaurantId` | `string` | Fulfilling Restaurant's ID. |
| | `items` | `CartItem[]` | List of items ordered. |
| | `status` | `OrderStatus` | Current lifecycle state. |
| | `subtotal` | `number` | Cost of items. |
| | `deliveryFee` | `number` | Delivery cost. |
| | `total` | `number` | Grand total in TL. |
| | `deliveryAddress` | `Address` | Shipping destination. |
| | `paymentInfo` | `PaymentInfo` | Selected payment details. |
| | `createdAt` | `string` | ISO timestamp of order placement. |
| | `estimatedDeliveryTime`| `string` | Estimated delivery time ISO timestamp. |
| **Review** | `id` | `string` | Unique identifier. |
| | `orderId` | `string` | Associated order ID. |
| | `userId` | `string` | Authoring user ID. |
| | `restaurantId` | `string` | Target restaurant ID. |
| | `rating` | `number` | Score provided (1-5). |
| | `comment` | `string` | User text review. |
| | `createdAt` | `string` | ISO timestamp. |

---

## Section 5: API Design

### 5.1 Internal State APIs (Zustand Store Actions)

#### 5.1.1 Auth Store API
- `login(email: string, password: string) -> Promise<boolean>`: Authenticates user. Automatically matches demo accounts or evaluates dynamically. Returns boolean success.
- `register(data: Partial<User>) -> Promise<boolean>`: Processes new user registration payload. Returns true on success.
- `logout() -> void`: Clears authentication tokens and resets user state to null.
- `updateProfile(data: Partial<User>) -> void`: Merges provided fields with the existing user profile state.
- `setUser(user: User | null) -> void`: Directly overwrites the user state object.

#### 5.1.2 Cart Store API
- `addItem(item: MenuItem, restaurant: Restaurant) -> boolean`: Inserts item to cart. Evaluates single-restaurant policy and returns false if blocked by cross-restaurant validation.
- `removeItem(menuItemId: string) -> void`: Removes specific item by ID from the active cart.
- `updateQuantity(menuItemId: string, quantity: number) -> void`: Mutates the count for a cart item.
- `clearCart() -> void`: Empties the item list and clears restaurant bindings.
- `addNote(menuItemId: string, note: string) -> void`: Appends or updates the instruction string on a cart item.
- `getSubtotal() -> number`: Aggregates base prices and selected options for all items.
- `getDeliveryFee() -> number`: Processes tiered logic: >=150 TL -> 0 TL, >=100 TL -> 5 TL, <100 TL -> 10 TL.
- `getTotal() -> number`: Computes `getSubtotal() + getDeliveryFee()`.
- `getItemCount() -> number`: Sums the quantity properties across all items.

#### 5.1.3 Order Store API
- `createOrder(params: Partial<Order>) -> Order`: Instantiates a new order object, pushes to state, and initiates the simulator progression sequence.
- `updateOrderStatus(orderId: string, status: OrderStatus) -> void`: Mutates the lifecycle state for a given order.
- `getActiveOrders() -> Order[]`: Filters state for orders evaluating to `pending`, `confirmed`, `preparing`, or `onTheWay`.
- `getPastOrders() -> Order[]`: Filters state for orders evaluating to `delivered` or `cancelled`.

#### 5.1.4 Settings Store API
- `setLanguage(lang: string) -> void`: Updates active application language and triggers `i18next` change.
- `toggleDarkMode() -> void`: Flips the dark mode boolean flag.
- `toggleNotifications() -> void`: Flips the notification permission preference flag.

### 5.2 External Service Integrations
- **Firebase Authentication:** (Planned) Identity management, token handling, and MFA.
- **Firebase Firestore:** (Planned) Scalable NoSQL real-time document database for orders and restaurants.
- **Firebase Storage:** (Planned) Object storage for menu item images and restaurant cover photos.
- **Google Maps API:** Integrated currently for Web target via `@react-google-maps/api`. Provides geocoding and rendering map components.
- **Google Mobile Ads:** Integrated for monetization; configured for Ad Banners and Interstitial campaigns.

### 5.3 Utility Functions API

> [!TIP]
> Found in `src/utils/formatters.ts` and `src/utils/helpers.ts`.

- `formatCurrency(amount: number) -> string`: Appends TL suffix and correctly formats decimal digits based on locale.
- `formatDate(isoString: string, formatStyle: string) -> string`: Parses ISO 8601 string and outputs human-readable date.
- `calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) -> number`: Computes Haversine distance between two sets of coordinates in kilometers.
- `getStatusBadgeColor(status: OrderStatus) -> string`: Maps order statuses to specific theme token identifiers for UI rendering.
- `generateMockOrderId() -> string`: Helper to produce unique alphanumeric strings simulating backend IDs.


---


# FoodChain Software Design Document - Part 2

## Table of Contents
- [Section 6: Screen Mockup Designs](#section-6-screen-mockup-designs)
- [Section 7: Use Cases](#section-7-use-cases)
- [Section 8: Use Case Specifications](#section-8-use-case-specifications)
  - [Customer Use Cases](#customer-use-cases)
  - [Restaurant Owner Use Cases](#restaurant-owner-use-cases)
  - [System Use Cases](#system-use-cases)

---

## Section 6: Screen Mockup Designs

> [!NOTE]
> All designs reference the central design system's theme tokens for colors, spacing, and typography. Spacing units: `xs` (4px), `sm` (8px), `md` (16px), `lg` (24px), `xl` (32px).

### 6.1 Login Screen (`/(auth)/login`)
Layout: `SafeAreaView` -> `KeyboardAvoidingView` -> `ScrollView`
- **Logo Section**: ğŸ” emoji (56px, centered), "FoodChain" title (34px, weight 900, `primary` color), subtitle text "Your favorite food, delivered fast." (16px, `textSecondary`).
- **Welcome Title**: 26px, weight 800, `text` color.
- **Email Input**: Label "Email", icon ğŸ“§, placeholder "email@example.com", bottom margin `md`.
- **Password Input**: Label "Password", icon ğŸ”’, `secureTextEntry`, eye toggle icon right-aligned.
- **Error banner**: (Conditional, `danger` text color, centered, `sm` padding).
- **Forgot Password link**: Right-aligned, `primary` color, 13px, margin bottom `lg`.
- **Login Button**: Full width, large size, `primary` background, white text.
- **Divider**: Horizontal line with "or" text in center.
- **Google Social Button**: Full width, `secondaryVariant` background, ğŸ”µ Google icon prefix.
- **Register link row**: Centered text "Don't have account? ", bold "Register" link in `primary` color.
- **Demo Accounts box**: `surfaceVariant` background, rounded `md`, lists predefined customer/owner credentials.

### 6.2 Register Screen (`/(auth)/register`)
Layout: `SafeAreaView` -> `KeyboardAvoidingView` -> `ScrollView`
- **Header**: Back button (â† 24px) top-left.
- **Title + Subtitle**: "Create Account" (26px), "Join FoodChain today" (16px).
- **Role Selector**: 2 cards side by side (ğŸ›’ Customer, ğŸª Restaurant Owner). Active card has `primary` border (2px) and light `primary` background.
- **Name row**: 2 inputs side by side (Name, Surname) with equal flex.
- **Contact Inputs**: Email, Phone inputs stacked vertically.
- **Password Inputs**: Password, Confirm Password inputs stacked vertically.
- **Register button**: Full width, large size, `primary` background.
- **Login link row**: Centered text "Already have an account? ", bold "Login" link.

### 6.3 Forgot Password Screen (`/(auth)/forgot-password`)
Layout: `SafeAreaView` -> `View`
- **Header**: Back button (absolute top-left, `md` padding).
- **Icon**: ğŸ”‘ icon (48px, centered, `primary` tint).
- **Title + Subtitle**: "Reset Password" (26px), "Enter your email to receive a reset link".
- **State 1**: Email input + "Reset" button (full width, `primary`).
- **State 2 (Success)**: Success box (`success` background, âœ… icon, text "Password reset link sent!").

### 6.4 Home/Explore Screen (`/(customer)/(tabs)/index`)
Layout: `SafeAreaView` -> `ScrollView`
- **Header Hero**: `primary` background, rounded bottom corners (`xl` radius).
  - Greeting row: "Good Morning, User ğŸ‘‹" (16px, white).
  - Address row: ğŸ“ icon, "Home - 123 Main St" (14px, white).
  - Cart icon (Conditional): Right-aligned, with red badge showing item count.
  - Search bar placeholder: Semi-transparent background, ğŸ” icon, "Search food, restaurants..." text.
- **Categories**: Horizontal `FlatList` of circular icons (56x56, `surface` bg) with category name below.
- **Featured**: Horizontal `FlatList` of cards (60% screen width, 120px image height, rounded `md`, free delivery badge overlay).
- **Nearby Restaurants**: Vertical list of row cards. Each card: 80x80 image left, name + desc + meta row (rating, time, fee) right.

### 6.5 Search Screen (`/(customer)/(tabs)/search`)
Layout: `SafeAreaView` -> `View`
- **Header**: Title 24px, bold.
- **SearchBar**: Component with auto-focus, clear button, `surfaceVariant` bg.
- **Category chips**: Horizontal scrollable bar of pill-shaped chips. Active chip is `primary` bg.
- **Results**:
  - Menu items section (if matching dishes found).
  - Restaurant list (vertical list identical to Home screen nearby cards).
- **Empty state**: Image/icon, "No results found" text, when search yields no matches.

### 6.6 Orders Screen (`/(customer)/(tabs)/orders`)
Layout: `SafeAreaView` -> `ScrollView`
- **Header**: Title 24px, bold, `xl` left padding.
- **Active Orders section**: Title with ğŸ”´ prefix, count badge (`primary` bg). Order cards for active orders.
- **Past Orders section**: Title "Past Orders". Order cards for completed/cancelled orders.
- **Order cards**: Row layout. 56x56 restaurant image, name, order items summary, date, status Badge (e.g., `warning` for preparing, `success` for delivered).
- **Empty state**: If no orders, show "No orders yet" graphic and "Explore Restaurants" button.

### 6.7 Profile Screen (`/(customer)/(tabs)/profile`)
Layout: `SafeAreaView` -> `ScrollView`
- **Header**: Title 24px, bold.
- **Avatar section**: Centered. Circle 80x80, `primary` bg, user initials (28px, white). User name + email text below.
- **Settings card**: `surface` bg, rounded `lg`. Contains clickable rows:
  - Addresses (ğŸ“ icon)
  - Language (ğŸŒ icon)
  - Dark Mode (ğŸŒ™ icon, trailing toggle switch)
  - Notifications (ğŸ”” icon, trailing toggle switch)
- **Logout button**: `danger` variant, full width, centered text.
- **Version text**: "v1.0.0", centered, `textSecondary`.

### 6.8 Restaurant Detail Screen (`/(customer)/restaurant/[id]`)
Layout: `View` -> `ScrollView`
- **Cover image**: Full width, 200px height.
- **Floating back button**: Absolute top-left, circular, `surface` bg, elevated.
- **Info card**: Negative top margin (-20px) to overlap image. `surface` bg, elevated, rounded top `xl`.
  - Name 22px, description text.
  - Meta row: â­ Rating, â±ï¸ Delivery time, ğŸ’µ Fee.
  - Open/closed status badge.
  - Map container: 150px height, rounded `md`, showing restaurant location pin.
- **Category tabs**: Horizontal scrollable tabs (sticky header behavior).
- **Menu items**: Vertical list. Row cards: 80x80 image, name, description, price, + add to cart button (circular, `primary`).
- **Floating cart bar**: Absolute bottom. `primary` bg, flex row: badge (count) + title "View Cart" + total price text.

### 6.9 Cart Screen (`/(customer)/cart`)
Layout: `SafeAreaView` -> `View`
- **Header**: Back button, Title "Cart", right-aligned "Clear" link (`danger` color).
- **Restaurant label**: Text showing which restaurant the cart belongs to.
- **Item cards**: List of items. 70x70 image, name, x delete button. Price and `QuantitySelector` (+/- buttons and number).
- **Summary card**: `surface` bg. Rows for Subtotal, Delivery Fee, dashed divider, Total row (bold, 18px).
- **Checkout bar**: Fixed bottom area. Large "Checkout" Button with total price text.

### 6.10 Checkout Screen (`/(customer)/checkout`)
Layout: `SafeAreaView` -> `ScrollView`
- **Header**: Back button, Title "Checkout".
- **Address section**: `surface` card, ğŸ“ icon, current address, "Change" link.
- **Payment section**: `surface` card, ğŸ’³ icon, title "Payment Method". 4 inputs: Card number, Holder name, Expiry/CVV (row layout).
- **Summary section**: Subtotal, Fee, Total.
- **Footer**: "Place Order" button (full width, loading indicator support).
- **Success modal**: Overlay. ğŸ‰ icon 64px, "Order Placed!" title, success message, "Track Order" button.

### 6.11 Order Tracking Screen (`/(customer)/tracking/[orderId]`)
Layout: `SafeAreaView` -> `ScrollView`
- **Header**: Back button, "Live Tracking" title.
- **Map container**: 220px height, rounded `md`.
  - Markers: ğŸª Restaurant, ğŸ“ Customer, ğŸš´ Courier (conditional if out for delivery).
  - Status overlay: Dark semi-transparent box top-left with current status.
  - ETA badge: `primary` bg, bottom-right, e.g., "15-20 min".
- **Progress stepper card**: 4 steps (Received, Preparing, On the Way, Delivered). Vertical dots with connecting lines. Active step highlighted.
- **Order details card**: Restaurant name, line items (quantity x name), divider, total price paid.

### 6.12 Restaurant Dashboard Screen (`/(restaurant)/(tabs)/index`)
Layout: `SafeAreaView` -> `ScrollView`
- **Header**: Title "Dashboard", bold 24px. User profile avatar right-aligned.
- **KPI Cards Row**: Horizontal scrollable or wrapped.
  - "Total Sales" (ğŸ’° icon, large number)
  - "Active Orders" (ğŸ“¦ icon, number)
  - "Avg Order Value" (ğŸ“ˆ icon, number)
- **Chart Section**: "Weekly Revenue" title. Bar chart or line chart visualization area.
- **Recent Orders List**: Header "Recent Orders", "View All" link. List of top 5 most recent order cards with quick status update buttons.

### 6.13 Restaurant Orders Screen (`/(restaurant)/(tabs)/orders`)
Layout: `SafeAreaView` -> `View`
- **Header**: Title "Orders Management".
- **Tabs**: "Active", "Completed" segmented control.
- **List Area**: Vertical list of order cards.
  - Card details: Order ID, Time, Customer Name, Item count, Total.
  - Status badge (e.g., "Pending", "Preparing").
  - Action buttons: "Accept", "Mark Ready", "Dispatch" depending on current status.

### 6.14 Restaurant Menu Screen (`/(restaurant)/(tabs)/menu`)
Layout: `SafeAreaView` -> `View`
- **Header**: Title "Menu Management".
- **Action Button**: Floating Action Button (FAB) bottom-right with â• icon to add new item.
- **Category Filter**: Horizontal chips to filter items.
- **Item List**: Row cards. Image, Name, Price.
  - Trailing controls: Availability toggle switch, Edit icon (âœï¸), Delete icon (ğŸ—‘ï¸).
- **Empty state**: "No items in menu. Tap + to add."

### 6.15 Restaurant Settings Screen (`/(restaurant)/(tabs)/settings`)
Layout: `SafeAreaView` -> `ScrollView`
- **Header**: Title "Restaurant Settings".
- **Profile Card**: Restaurant Name, Email, address info.
- **Settings List**:
  - Operating Hours (ğŸ•’ icon)
  - Delivery Zones & Fees (ğŸ›µ icon)
  - Language (ğŸŒ icon)
  - Dark Mode (ğŸŒ™ icon, toggle)
- **Logout button**: `danger` variant, full width.

---

## Section 7: Use Cases

### Customer Use Cases
- UC-C-001: Register as Customer
- UC-C-002: Register as Restaurant Owner
- UC-C-003: Login with Credentials
- UC-C-004: Login with Demo Account
- UC-C-005: Request Password Reset
- UC-C-006: Browse Home Screen
- UC-C-007: Navigate via Category
- UC-C-008: Search Restaurants
- UC-C-009: Search Menu Items
- UC-C-010: Filter by Category
- UC-C-011: View Restaurant Details
- UC-C-012: View Restaurant Map
- UC-C-013: Browse Menu by Category
- UC-C-014: Add Item to Cart
- UC-C-015: Handle Cross-Restaurant Cart Conflict
- UC-C-016: View Cart
- UC-C-017: Update Item Quantity
- UC-C-018: Remove Item from Cart
- UC-C-019: Clear Entire Cart
- UC-C-020: Proceed to Checkout
- UC-C-021: Enter Payment Information
- UC-C-022: Place Order
- UC-C-023: View Order Confirmation
- UC-C-024: View Order List
- UC-C-025: Track Active Order
- UC-C-026: View Order Progress Steps
- UC-C-027: View Order Details
- UC-C-028: Toggle Dark Mode
- UC-C-029: Change Language
- UC-C-030: Toggle Notifications
- UC-C-031: Logout

### Restaurant Owner Use Cases
- UC-R-001: View Dashboard KPIs
- UC-R-002: View Weekly Statistics Chart
- UC-R-003: View Recent Orders
- UC-R-004: Filter Orders (Active/Completed)
- UC-R-005: Update Order Status
- UC-R-006: View Menu Items
- UC-R-007: Add New Menu Item
- UC-R-008: Edit Menu Item
- UC-R-009: Toggle Item Availability
- UC-R-010: Delete Menu Item
- UC-R-011: Change Language
- UC-R-012: Toggle Dark Mode
- UC-R-013: Logout

### System Use Cases
- UC-S-001: Simulate Order Progression
- UC-S-002: Calculate Delivery Fee
- UC-S-003: Resolve Time-of-Day Greeting
- UC-S-004: Format Prices
- UC-S-005: Detect Device Language
- UC-S-006: Route Based on Auth State
- UC-S-007: Route Based on User Role

---

## Section 8: Use Case Specifications

> [!IMPORTANT]
> The following table structure defines the required behavior, constraints, and UI interactions for every system capability.

### Customer Use Cases

#### UC-C-001: Register as Customer
| Field | Value |
|-------|-------|
| ID | UC-C-001 |
| Name | Register as Customer |
| Actor | Customer |
| Priority | High |
| Related Requirements | REQ-USR-001 |
| Screen | `/(auth)/register` |

**Description:** A new user creates a customer account to order food.
**Preconditions:**
1. User has downloaded and opened the app.
2. User is not currently authenticated.
**Main Flow:**
1. User taps "Register" on Login screen.
2. User selects "Customer" role card.
3. User enters valid Name, Surname, Email, Phone, and matching Passwords.
4. User taps "Register" button.
5. System creates account and redirects to Customer Home Screen.
**Exception Flows:**
- Email already exists: System displays error banner "Email is already in use".
- Passwords mismatch: System displays validation error under inputs.
**Postconditions:**
1. User record is created in database.
2. User session is active.
**Business Rules:** Password must be >= 6 characters.

#### UC-C-002: Register as Restaurant Owner
| Field | Value |
|-------|-------|
| ID | UC-C-002 |
| Name | Register as Restaurant Owner |
| Actor | Restaurant Owner |
| Priority | High |
| Related Requirements | REQ-USR-001 |
| Screen | `/(auth)/register` |

**Description:** A business user creates an account to manage a restaurant.
**Main Flow:** Identical to UC-C-001, but user selects "Restaurant Owner" role card. Redirects to Restaurant Dashboard upon success.

#### UC-C-003: Login with Credentials
| Field | Value |
|-------|-------|
| ID | UC-C-003 |
| Name | Login with Credentials |
| Actor | Customer / Restaurant Owner |
| Priority | High |
| Related Requirements | REQ-USR-002 |
| Screen | `/(auth)/login` |

**Description:** Returning user authenticates using email and password.
**Preconditions:** User has an existing account.
**Main Flow:**
1. User enters email and password.
2. User taps "Login".
3. System authenticates and routes to appropriate tab group based on role.
**Exception Flows:**
- Invalid credentials: Show "Invalid email or password" error.

#### UC-C-004: Login with Demo Account
| Field | Value |
|-------|-------|
| ID | UC-C-004 |
| Name | Login with Demo Account |
| Actor | Customer / Restaurant Owner |
| Priority | Medium |
| Related Requirements | REQ-USR-005 |
| Screen | `/(auth)/login` |

**Description:** User taps a pre-filled demo account button for quick evaluation.
**Main Flow:**
1. User taps a demo account row in the "Demo Accounts" box.
2. System auto-fills email and password.
3. System automatically submits login request.
4. User is routed to appropriate dashboard.

#### UC-C-005: Request Password Reset
| Field | Value |
|-------|-------|
| ID | UC-C-005 |
| Name | Request Password Reset |
| Actor | Customer / Restaurant Owner |
| Priority | Low |
| Related Requirements | REQ-USR-006 |
| Screen | `/(auth)/forgot-password` |

**Description:** User requests a link to reset their forgotten password.
**Main Flow:**
1. User taps "Forgot Password" on login screen.
2. User enters registered email.
3. User taps "Reset".
4. System displays success state.

#### UC-C-006: Browse Home Screen
| Field | Value |
|-------|-------|
| ID | UC-C-006 |
| Name | Browse Home Screen |
| Actor | Customer |
| Priority | High |
| Related Requirements | REQ-APP-001 |
| Screen | `/(customer)/(tabs)/index` |

**Description:** Customer views the main feed containing categories, featured, and nearby restaurants.
**Main Flow:**
1. Customer opens app and is authenticated.
2. System loads and displays categories, featured items, and nearby list.
3. Customer scrolls vertically and horizontally to view content.

#### UC-C-007: Navigate via Category
| Field | Value |
|-------|-------|
| ID | UC-C-007 |
| Name | Navigate via Category |
| Actor | Customer |
| Priority | Medium |
| Related Requirements | REQ-APP-002 |
| Screen | `/(customer)/(tabs)/index` |

**Description:** Customer taps a category icon to view filtered results.
**Main Flow:**
1. Customer taps a category (e.g., "Pizza").
2. System routes to Search screen with "Pizza" category chip pre-selected.

#### UC-C-008: Search Restaurants
| Field | Value |
|-------|-------|
| ID | UC-C-008 |
| Name | Search Restaurants |
| Actor | Customer |
| Priority | High |
| Related Requirements | REQ-APP-003 |
| Screen | `/(customer)/(tabs)/search` |

**Description:** Customer searches for a specific restaurant by name.
**Main Flow:**
1. Customer focuses search bar and types query.
2. System filters restaurant list based on query matching restaurant name.

#### UC-C-009: Search Menu Items
| Field | Value |
|-------|-------|
| ID | UC-C-009 |
| Name | Search Menu Items |
| Actor | Customer |
| Priority | High |
| Related Requirements | REQ-APP-003 |
| Screen | `/(customer)/(tabs)/search` |

**Description:** Customer searches for a specific food item globally.
**Main Flow:**
1. Customer types query (e.g., "Burger").
2. System displays matching menu items from various restaurants in the results area.

#### UC-C-010: Filter by Category
| Field | Value |
|-------|-------|
| ID | UC-C-010 |
| Name | Filter by Category |
| Actor | Customer |
| Priority | Medium |
| Related Requirements | REQ-APP-002 |
| Screen | `/(customer)/(tabs)/search` |

**Description:** Customer applies category filters on the search screen.
**Main Flow:**
1. Customer taps a category chip.
2. System highlights chip and filters visible results to match.

#### UC-C-011: View Restaurant Details
| Field | Value |
|-------|-------|
| ID | UC-C-011 |
| Name | View Restaurant Details |
| Actor | Customer |
| Priority | High |
| Related Requirements | REQ-RES-001 |
| Screen | `/(customer)/restaurant/[id]` |

**Description:** Customer views full restaurant profile and menu.
**Main Flow:**
1. Customer taps a restaurant card.
2. System navigates to detail screen, loading header info and menu items.

#### UC-C-012: View Restaurant Map
| Field | Value |
|-------|-------|
| ID | UC-C-012 |
| Name | View Restaurant Map |
| Actor | Customer |
| Priority | Low |
| Related Requirements | REQ-RES-002 |
| Screen | `/(customer)/restaurant/[id]` |

**Description:** Customer views the physical location of the restaurant on a map snippet.
**Main Flow:** System renders MapView component in the info card with a marker at restaurant coordinates.

#### UC-C-013: Browse Menu by Category
| Field | Value |
|-------|-------|
| ID | UC-C-013 |
| Name | Browse Menu by Category |
| Actor | Customer |
| Priority | Medium |
| Related Requirements | REQ-RES-003 |
| Screen | `/(customer)/restaurant/[id]` |

**Description:** Customer taps category tabs within a restaurant to scroll to specific menu sections.
**Main Flow:** Customer taps tab -> ScrollView automatically scrolls to the corresponding section header.

#### UC-C-014: Add Item to Cart
| Field | Value |
|-------|-------|
| ID | UC-C-014 |
| Name | Add Item to Cart |
| Actor | Customer |
| Priority | High |
| Related Requirements | REQ-ORD-001 |
| Screen | `/(customer)/restaurant/[id]` |

**Description:** Customer adds a menu item to their current cart.
**Main Flow:**
1. Customer taps "+" button next to menu item.
2. Item is added to global cart state.
3. Floating cart bar updates total and item count.

#### UC-C-015: Handle Cross-Restaurant Cart Conflict
| Field | Value |
|-------|-------|
| ID | UC-C-015 |
| Name | Handle Cross-Restaurant Cart Conflict |
| Actor | Customer |
| Priority | High |
| Related Requirements | REQ-ORD-002 |
| Screen | `/(customer)/restaurant/[id]` |

**Description:** Customer tries to add an item from Restaurant B when cart has items from Restaurant A.
**Main Flow:**
1. Customer taps "+".
2. System detects conflict and shows Alert modal ("Clear cart to add from new restaurant?").
3. Customer confirms -> Cart cleared, new item added.
**Exception Flow:** Customer cancels -> Cart remains unchanged.

#### UC-C-016: View Cart
| Field | Value |
|-------|-------|
| ID | UC-C-016 |
| Name | View Cart |
| Actor | Customer |
| Priority | High |
| Related Requirements | REQ-ORD-003 |
| Screen | `/(customer)/cart` |

**Description:** Customer reviews selected items and totals before checkout.
**Main Flow:** Customer taps Floating Cart Bar or Header Cart Icon -> Navigates to Cart Screen.

#### UC-C-017: Update Item Quantity
| Field | Value |
|-------|-------|
| ID | UC-C-017 |
| Name | Update Item Quantity |
| Actor | Customer |
| Priority | Medium |
| Related Requirements | REQ-ORD-004 |
| Screen | `/(customer)/cart` |

**Description:** Customer increases or decreases item quantity.
**Main Flow:** Customer taps "+" or "-" on QuantitySelector. Cart total updates dynamically. If quantity reaches 0, item is removed.

#### UC-C-018: Remove Item from Cart
| Field | Value |
|-------|-------|
| ID | UC-C-018 |
| Name | Remove Item from Cart |
| Actor | Customer |
| Priority | Medium |
| Related Requirements | REQ-ORD-005 |
| Screen | `/(customer)/cart` |

**Description:** Customer removes a specific item row entirely.
**Main Flow:** Customer taps "X" delete button on item card -> Item removed, totals updated.

#### UC-C-019: Clear Entire Cart
| Field | Value |
|-------|-------|
| ID | UC-C-019 |
| Name | Clear Entire Cart |
| Actor | Customer |
| Priority | Low |
| Related Requirements | REQ-ORD-006 |
| Screen | `/(customer)/cart` |

**Description:** Customer empties the cart completely.
**Main Flow:** Customer taps "Clear" link -> Cart state is reset -> Redirects to Home screen.

#### UC-C-020: Proceed to Checkout
| Field | Value |
|-------|-------|
| ID | UC-C-020 |
| Name | Proceed to Checkout |
| Actor | Customer |
| Priority | High |
| Related Requirements | REQ-CHK-001 |
| Screen | `/(customer)/cart` |

**Description:** Customer initiates checkout process.
**Main Flow:** Customer taps "Checkout" button -> Navigates to Checkout screen.

#### UC-C-021: Enter Payment Information
| Field | Value |
|-------|-------|
| ID | UC-C-021 |
| Name | Enter Payment Information |
| Actor | Customer |
| Priority | High |
| Related Requirements | REQ-CHK-002 |
| Screen | `/(customer)/checkout` |

**Description:** Customer inputs credit card details.
**Main Flow:** Customer types into card number, holder name, expiry, CVV fields. System validates format.

#### UC-C-022: Place Order
| Field | Value |
|-------|-------|
| ID | UC-C-022 |
| Name | Place Order |
| Actor | Customer |
| Priority | High |
| Related Requirements | REQ-CHK-003 |
| Screen | `/(customer)/checkout` |

**Description:** Customer finalizes and submits the order.
**Main Flow:**
1. Customer taps "Place Order".
2. System shows loading spinner.
3. System creates order record in database.
4. Cart is cleared.
5. Success modal appears.

#### UC-C-023: View Order Confirmation
| Field | Value |
|-------|-------|
| ID | UC-C-023 |
| Name | View Order Confirmation |
| Actor | Customer |
| Priority | Medium |
| Related Requirements | REQ-CHK-004 |
| Screen | `/(customer)/checkout` |

**Description:** Customer sees success modal after placing order.
**Main Flow:** Success modal displays. User can tap "Track Order" to navigate to tracking screen, or dismiss to go to Home.

#### UC-C-024: View Order List
| Field | Value |
|-------|-------|
| ID | UC-C-024 |
| Name | View Order List |
| Actor | Customer |
| Priority | High |
| Related Requirements | REQ-TRK-001 |
| Screen | `/(customer)/(tabs)/orders` |

**Description:** Customer views history and current active orders.
**Main Flow:** Customer taps "Orders" tab. System fetches and displays order lists.

#### UC-C-025: Track Active Order
| Field | Value |
|-------|-------|
| ID | UC-C-025 |
| Name | Track Active Order |
| Actor | Customer |
| Priority | High |
| Related Requirements | REQ-TRK-002 |
| Screen | `/(customer)/tracking/[orderId]` |

**Description:** Customer monitors real-time status of an order.
**Main Flow:** Customer taps an active order card -> Navigates to Tracking screen. System polls or subscribes to order status changes.

#### UC-C-026: View Order Progress Steps
| Field | Value |
|-------|-------|
| ID | UC-C-026 |
| Name | View Order Progress Steps |
| Actor | Customer |
| Priority | Medium |
| Related Requirements | REQ-TRK-003 |
| Screen | `/(customer)/tracking/[orderId]` |

**Description:** Customer sees visual stepper indicating progress.
**Main Flow:** System highlights current step in the stepper component based on order status (e.g., Pending, Preparing, Delivering, Completed).

#### UC-C-027: View Order Details
| Field | Value |
|-------|-------|
| ID | UC-C-027 |
| Name | View Order Details |
| Actor | Customer |
| Priority | Low |
| Related Requirements | REQ-TRK-004 |
| Screen | `/(customer)/tracking/[orderId]` |

**Description:** Customer reviews what they bought on the tracking screen.
**Main Flow:** Customer scrolls down tracking screen to view line items and total paid.

#### UC-C-028: Toggle Dark Mode
| Field | Value |
|-------|-------|
| ID | UC-C-028 |
| Name | Toggle Dark Mode |
| Actor | Customer |
| Priority | Low |
| Related Requirements | REQ-SYS-001 |
| Screen | `/(customer)/(tabs)/profile` |

**Description:** Customer changes app theme.
**Main Flow:** Customer toggles switch -> ThemeContext updates -> App re-renders with new color palette.

#### UC-C-029: Change Language
| Field | Value |
|-------|-------|
| ID | UC-C-029 |
| Name | Change Language |
| Actor | Customer |
| Priority | Low |
| Related Requirements | REQ-SYS-002 |
| Screen | `/(customer)/(tabs)/profile` |

**Description:** Customer changes localization.
**Main Flow:** Customer taps Language row -> Selects new language -> i18n instance updates -> UI text translates.

#### UC-C-030: Toggle Notifications
| Field | Value |
|-------|-------|
| ID | UC-C-030 |
| Name | Toggle Notifications |
| Actor | Customer |
| Priority | Low |
| Related Requirements | REQ-SYS-003 |
| Screen | `/(customer)/(tabs)/profile` |

**Description:** Customer opts in/out of push notifications.
**Main Flow:** Customer toggles switch -> Updates user preferences locally.

#### UC-C-031: Logout
| Field | Value |
|-------|-------|
| ID | UC-C-031 |
| Name | Logout |
| Actor | Customer |
| Priority | High |
| Related Requirements | REQ-USR-004 |
| Screen | `/(customer)/(tabs)/profile` |

**Description:** Customer ends session.
**Main Flow:** Customer taps "Logout" -> Session cleared -> Redirected to Login screen.

---

### Restaurant Owner Use Cases

#### UC-R-001: View Dashboard KPIs
| Field | Value |
|-------|-------|
| ID | UC-R-001 |
| Name | View Dashboard KPIs |
| Actor | Restaurant Owner |
| Priority | High |
| Related Requirements | REQ-OWN-001 |
| Screen | `/(restaurant)/(tabs)/index` |

**Description:** Owner views top-level metrics.
**Main Flow:** System calculates Total Sales, Orders, AOV from database and displays on Dashboard.

#### UC-R-002: View Weekly Statistics Chart
| Field | Value |
|-------|-------|
| ID | UC-R-002 |
| Name | View Weekly Statistics Chart |
| Actor | Restaurant Owner |
| Priority | Medium |
| Related Requirements | REQ-OWN-002 |
| Screen | `/(restaurant)/(tabs)/index` |

**Description:** Owner views revenue trend.
**Main Flow:** System renders chart component with trailing 7-day revenue data.

#### UC-R-003: View Recent Orders
| Field | Value |
|-------|-------|
| ID | UC-R-003 |
| Name | View Recent Orders |
| Actor | Restaurant Owner |
| Priority | High |
| Related Requirements | REQ-OWN-003 |
| Screen | `/(restaurant)/(tabs)/index` |

**Description:** Owner sees most recent incoming orders.
**Main Flow:** Dashboard displays up to 5 newest orders for quick access.

#### UC-R-004: Filter Orders (Active/Completed)
| Field | Value |
|-------|-------|
| ID | UC-R-004 |
| Name | Filter Orders (Active/Completed) |
| Actor | Restaurant Owner |
| Priority | Medium |
| Related Requirements | REQ-OWN-004 |
| Screen | `/(restaurant)/(tabs)/orders` |

**Description:** Owner switches between ongoing and past orders.
**Main Flow:** Owner taps tab -> List updates to show matching status orders.

#### UC-R-005: Update Order Status
| Field | Value |
|-------|-------|
| ID | UC-R-005 |
| Name | Update Order Status |
| Actor | Restaurant Owner |
| Priority | High |
| Related Requirements | REQ-OWN-005 |
| Screen | `/(restaurant)/(tabs)/orders` |

**Description:** Owner advances order state (e.g., Pending -> Preparing).
**Main Flow:** Owner taps action button on order card -> Database updates status -> UI refreshes.

#### UC-R-006: View Menu Items
| Field | Value |
|-------|-------|
| ID | UC-R-006 |
| Name | View Menu Items |
| Actor | Restaurant Owner |
| Priority | High |
| Related Requirements | REQ-OWN-006 |
| Screen | `/(restaurant)/(tabs)/menu` |

**Description:** Owner sees catalog of their offerings.
**Main Flow:** Menu screen loads and displays list of items owned by restaurant.

#### UC-R-007: Add New Menu Item
| Field | Value |
|-------|-------|
| ID | UC-R-007 |
| Name | Add New Menu Item |
| Actor | Restaurant Owner |
| Priority | High |
| Related Requirements | REQ-OWN-007 |
| Screen | `/(restaurant)/(tabs)/menu` |

**Description:** Owner creates a new product.
**Main Flow:** Owner taps FAB -> Opens modal/form -> Enters details -> Saves -> List updates.

#### UC-R-008: Edit Menu Item
| Field | Value |
|-------|-------|
| ID | UC-R-008 |
| Name | Edit Menu Item |
| Actor | Restaurant Owner |
| Priority | Medium |
| Related Requirements | REQ-OWN-008 |
| Screen | `/(restaurant)/(tabs)/menu` |

**Description:** Owner modifies existing product details.
**Main Flow:** Owner taps Edit icon -> Opens pre-filled form -> Updates -> Saves.

#### UC-R-009: Toggle Item Availability
| Field | Value |
|-------|-------|
| ID | UC-R-009 |
| Name | Toggle Item Availability |
| Actor | Restaurant Owner |
| Priority | High |
| Related Requirements | REQ-OWN-009 |
| Screen | `/(restaurant)/(tabs)/menu` |

**Description:** Owner marks an item out of stock.
**Main Flow:** Owner taps toggle switch on item card -> Database updates `isAvailable` flag -> Item appears grayed out for customers.

#### UC-R-010: Delete Menu Item
| Field | Value |
|-------|-------|
| ID | UC-R-010 |
| Name | Delete Menu Item |
| Actor | Restaurant Owner |
| Priority | Low |
| Related Requirements | REQ-OWN-010 |
| Screen | `/(restaurant)/(tabs)/menu` |

**Description:** Owner permanently removes a product.
**Main Flow:** Owner taps Delete icon -> Confirms in Alert -> Item deleted.

#### UC-R-011: Change Language
| Field | Value |
|-------|-------|
| ID | UC-R-011 |
| Name | Change Language |
| Actor | Restaurant Owner |
| Priority | Low |
| Related Requirements | REQ-SYS-002 |
| Screen | `/(restaurant)/(tabs)/settings` |

**Description:** Same as UC-C-029 but on Owner Settings screen.
**Main Flow:** Toggles language context.

#### UC-R-012: Toggle Dark Mode
| Field | Value |
|-------|-------|
| ID | UC-R-012 |
| Name | Toggle Dark Mode |
| Actor | Restaurant Owner |
| Priority | Low |
| Related Requirements | REQ-SYS-001 |
| Screen | `/(restaurant)/(tabs)/settings` |

**Description:** Same as UC-C-028 but on Owner Settings screen.
**Main Flow:** Toggles theme context.

#### UC-R-013: Logout
| Field | Value |
|-------|-------|
| ID | UC-R-013 |
| Name | Logout |
| Actor | Restaurant Owner |
| Priority | High |
| Related Requirements | REQ-USR-004 |
| Screen | `/(restaurant)/(tabs)/settings` |

**Description:** Same as UC-C-031 but on Owner Settings screen.
**Main Flow:** Clears session, routes to login.

---

### System Use Cases

#### UC-S-001: Simulate Order Progression
| Field | Value |
|-------|-------|
| ID | UC-S-001 |
| Name | Simulate Order Progression |
| Actor | System |
| Priority | Medium |
| Related Requirements | REQ-SIM-001 |
| Screen | Background Process |

**Description:** In a demo environment, system automatically advances order states if the owner doesn't do it manually.
**Main Flow:** 2 minutes after order placed -> Update to "Preparing". 5 mins later -> "Delivering". 5 mins later -> "Completed".

#### UC-S-002: Calculate Delivery Fee
| Field | Value |
|-------|-------|
| ID | UC-S-002 |
| Name | Calculate Delivery Fee |
| Actor | System |
| Priority | High |
| Related Requirements | REQ-CAL-001 |
| Screen | `/(customer)/cart` |

**Description:** System determines shipping cost.
**Main Flow:** System checks restaurant's base delivery fee and applies to cart totals.

#### UC-S-003: Resolve Time-of-Day Greeting
| Field | Value |
|-------|-------|
| ID | UC-S-003 |
| Name | Resolve Time-of-Day Greeting |
| Actor | System |
| Priority | Low |
| Related Requirements | REQ-UI-001 |
| Screen | `/(customer)/(tabs)/index` |

**Description:** System checks device time to show Morning/Afternoon/Evening.
**Main Flow:** `Date.getHours()` checked on Home screen mount -> Returns string.

#### UC-S-004: Format Prices
| Field | Value |
|-------|-------|
| ID | UC-S-004 |
| Name | Format Prices |
| Actor | System |
| Priority | Medium |
| Related Requirements | REQ-UI-002 |
| Screen | Global |

**Description:** System ensures all prices show standard currency symbol and 2 decimal places.
**Main Flow:** Utility function `formatCurrency(val)` applied globally before rendering numbers.

#### UC-S-005: Detect Device Language
| Field | Value |
|-------|-------|
| ID | UC-S-005 |
| Name | Detect Device Language |
| Actor | System |
| Priority | Low |
| Related Requirements | REQ-SYS-002 |
| Screen | App Boot |

**Description:** System initializes i18n with device locale if no user preference is saved.
**Main Flow:** On startup, read OS locale -> set app language.

#### UC-S-006: Route Based on Auth State
| Field | Value |
|-------|-------|
| ID | UC-S-006 |
| Name | Route Based on Auth State |
| Actor | System |
| Priority | High |
| Related Requirements | REQ-SEC-001 |
| Screen | Expo Router root `_layout` |

**Description:** System prevents unauthenticated access to tabs.
**Main Flow:** If no session, enforce redirect to `/(auth)/login`.

#### UC-S-007: Route Based on User Role
| Field | Value |
|-------|-------|
| ID | UC-S-007 |
| Name | Route Based on User Role |
| Actor | System |
| Priority | High |
| Related Requirements | REQ-SEC-002 |
| Screen | Auth Callback |

**Description:** System directs logged-in user to correct tab group.
**Main Flow:** On login success, check `user.role`. If customer -> route to `/(customer)`. If owner -> route to `/(restaurant)`.
