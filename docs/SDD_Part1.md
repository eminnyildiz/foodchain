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
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Root layout with auth guard
│   ├── (auth)/             # Authentication flow
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (customer)/         # Customer flow
│   │   ├── _layout.tsx
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx   # Home/Explore
│   │   │   ├── search.tsx
│   │   │   ├── orders.tsx
│   │   │   └── profile.tsx
│   │   ├── restaurant/[id].tsx
│   │   ├── cart.tsx
│   │   ├── checkout.tsx
│   │   └── tracking/[orderId].tsx
│   └── (restaurant)/       # Restaurant panel
│       ├── _layout.tsx
│       └── (tabs)/
│           ├── _layout.tsx
│           ├── dashboard.tsx
│           ├── orders.tsx
│           ├── menu.tsx
│           └── settings.tsx
├── components/             # Reusable UI components
│   ├── Map.tsx             # Native map component
│   ├── Map.web.tsx         # Web map component
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── EmptyState.tsx
│       ├── Input.tsx
│       ├── QuantitySelector.tsx
│       └── SearchBar.tsx
├── store/                  # Zustand state stores
│   ├── authStore.ts
│   ├── cartStore.ts
│   ├── orderStore.ts
│   └── settingsStore.ts
├── types/
│   └── index.ts
├── data/                   # Demo/mock data
│   ├── categories.ts
│   ├── menuItems.ts
│   ├── orders.ts
│   └── restaurants.ts
├── hooks/
│   └── useTheme.ts
├── utils/
│   ├── formatters.ts
│   └── helpers.ts
├── constants/
│   ├── theme.ts
│   └── config.ts
├── services/
│   └── ads.tsx
└── i18n/
    ├── index.ts
    ├── tr.json
    └── en.json
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
