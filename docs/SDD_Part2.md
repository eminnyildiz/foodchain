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
- **Logo Section**: 🍔 emoji (56px, centered), "FoodChain" title (34px, weight 900, `primary` color), subtitle text "Your favorite food, delivered fast." (16px, `textSecondary`).
- **Welcome Title**: 26px, weight 800, `text` color.
- **Email Input**: Label "Email", icon 📧, placeholder "email@example.com", bottom margin `md`.
- **Password Input**: Label "Password", icon 🔒, `secureTextEntry`, eye toggle icon right-aligned.
- **Error banner**: (Conditional, `danger` text color, centered, `sm` padding).
- **Forgot Password link**: Right-aligned, `primary` color, 13px, margin bottom `lg`.
- **Login Button**: Full width, large size, `primary` background, white text.
- **Divider**: Horizontal line with "or" text in center.
- **Google Social Button**: Full width, `secondaryVariant` background, 🔵 Google icon prefix.
- **Register link row**: Centered text "Don't have account? ", bold "Register" link in `primary` color.
- **Demo Accounts box**: `surfaceVariant` background, rounded `md`, lists predefined customer/owner credentials.

### 6.2 Register Screen (`/(auth)/register`)
Layout: `SafeAreaView` -> `KeyboardAvoidingView` -> `ScrollView`
- **Header**: Back button (← 24px) top-left.
- **Title + Subtitle**: "Create Account" (26px), "Join FoodChain today" (16px).
- **Role Selector**: 2 cards side by side (🛒 Customer, 🏪 Restaurant Owner). Active card has `primary` border (2px) and light `primary` background.
- **Name row**: 2 inputs side by side (Name, Surname) with equal flex.
- **Contact Inputs**: Email, Phone inputs stacked vertically.
- **Password Inputs**: Password, Confirm Password inputs stacked vertically.
- **Register button**: Full width, large size, `primary` background.
- **Login link row**: Centered text "Already have an account? ", bold "Login" link.

### 6.3 Forgot Password Screen (`/(auth)/forgot-password`)
Layout: `SafeAreaView` -> `View`
- **Header**: Back button (absolute top-left, `md` padding).
- **Icon**: 🔑 icon (48px, centered, `primary` tint).
- **Title + Subtitle**: "Reset Password" (26px), "Enter your email to receive a reset link".
- **State 1**: Email input + "Reset" button (full width, `primary`).
- **State 2 (Success)**: Success box (`success` background, ✅ icon, text "Password reset link sent!").

### 6.4 Home/Explore Screen (`/(customer)/(tabs)/index`)
Layout: `SafeAreaView` -> `ScrollView`
- **Header Hero**: `primary` background, rounded bottom corners (`xl` radius).
  - Greeting row: "Good Morning, User 👋" (16px, white).
  - Address row: 📍 icon, "Home - 123 Main St" (14px, white).
  - Cart icon (Conditional): Right-aligned, with red badge showing item count.
  - Search bar placeholder: Semi-transparent background, 🔍 icon, "Search food, restaurants..." text.
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
- **Active Orders section**: Title with 🔴 prefix, count badge (`primary` bg). Order cards for active orders.
- **Past Orders section**: Title "Past Orders". Order cards for completed/cancelled orders.
- **Order cards**: Row layout. 56x56 restaurant image, name, order items summary, date, status Badge (e.g., `warning` for preparing, `success` for delivered).
- **Empty state**: If no orders, show "No orders yet" graphic and "Explore Restaurants" button.

### 6.7 Profile Screen (`/(customer)/(tabs)/profile`)
Layout: `SafeAreaView` -> `ScrollView`
- **Header**: Title 24px, bold.
- **Avatar section**: Centered. Circle 80x80, `primary` bg, user initials (28px, white). User name + email text below.
- **Settings card**: `surface` bg, rounded `lg`. Contains clickable rows:
  - Addresses (📍 icon)
  - Language (🌐 icon)
  - Dark Mode (🌙 icon, trailing toggle switch)
  - Notifications (🔔 icon, trailing toggle switch)
- **Logout button**: `danger` variant, full width, centered text.
- **Version text**: "v1.0.0", centered, `textSecondary`.

### 6.8 Restaurant Detail Screen (`/(customer)/restaurant/[id]`)
Layout: `View` -> `ScrollView`
- **Cover image**: Full width, 200px height.
- **Floating back button**: Absolute top-left, circular, `surface` bg, elevated.
- **Info card**: Negative top margin (-20px) to overlap image. `surface` bg, elevated, rounded top `xl`.
  - Name 22px, description text.
  - Meta row: ⭐ Rating, ⏱️ Delivery time, 💵 Fee.
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
- **Address section**: `surface` card, 📍 icon, current address, "Change" link.
- **Payment section**: `surface` card, 💳 icon, title "Payment Method". 4 inputs: Card number, Holder name, Expiry/CVV (row layout).
- **Summary section**: Subtotal, Fee, Total.
- **Footer**: "Place Order" button (full width, loading indicator support).
- **Success modal**: Overlay. 🎉 icon 64px, "Order Placed!" title, success message, "Track Order" button.

### 6.11 Order Tracking Screen (`/(customer)/tracking/[orderId]`)
Layout: `SafeAreaView` -> `ScrollView`
- **Header**: Back button, "Live Tracking" title.
- **Map container**: 220px height, rounded `md`.
  - Markers: 🏪 Restaurant, 📍 Customer, 🚴 Courier (conditional if out for delivery).
  - Status overlay: Dark semi-transparent box top-left with current status.
  - ETA badge: `primary` bg, bottom-right, e.g., "15-20 min".
- **Progress stepper card**: 4 steps (Received, Preparing, On the Way, Delivered). Vertical dots with connecting lines. Active step highlighted.
- **Order details card**: Restaurant name, line items (quantity x name), divider, total price paid.

### 6.12 Restaurant Dashboard Screen (`/(restaurant)/(tabs)/index`)
Layout: `SafeAreaView` -> `ScrollView`
- **Header**: Title "Dashboard", bold 24px. User profile avatar right-aligned.
- **KPI Cards Row**: Horizontal scrollable or wrapped.
  - "Total Sales" (💰 icon, large number)
  - "Active Orders" (📦 icon, number)
  - "Avg Order Value" (📈 icon, number)
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
- **Action Button**: Floating Action Button (FAB) bottom-right with ➕ icon to add new item.
- **Category Filter**: Horizontal chips to filter items.
- **Item List**: Row cards. Image, Name, Price.
  - Trailing controls: Availability toggle switch, Edit icon (✏️), Delete icon (🗑️).
- **Empty state**: "No items in menu. Tap + to add."

### 6.15 Restaurant Settings Screen (`/(restaurant)/(tabs)/settings`)
Layout: `SafeAreaView` -> `ScrollView`
- **Header**: Title "Restaurant Settings".
- **Profile Card**: Restaurant Name, Email, address info.
- **Settings List**:
  - Operating Hours (🕒 icon)
  - Delivery Zones & Fees (🛵 icon)
  - Language (🌐 icon)
  - Dark Mode (🌙 icon, toggle)
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
