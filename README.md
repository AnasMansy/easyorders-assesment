 

A modern, responsive **Product Detail Page** for an e-commerce app.  
Built with **React + TypeScript**, **Tailwind CSS**, and **Zustand** (with Immer + persist).

Includes image gallery with zoom, variation selection, and a persistent cart drawer.

---

## ✨ Features

### **Product Detail**
- Main image + thumbnails + arrow navigation
- Zoom (react-medium-image-zoom)
- HTML description with **See more / See less**
- Dynamic price (sale/original)
- Variation selection (color swatches + size buttons)
- Add to cart + Checkout (opens drawer)

### **Cart Drawer**
- Persistent via Zustand Persist (localStorage)
- Merge items by variant
- Quantity update, remove, clear
- Subtotal auto-calculation using sale price if available

### **State**
- `useProductStore`: product, selection, helpers
- `useCartStore`: items + totals + mutations
- `useCartDrawerStore`: toggle / open / close

### **Data**
- Axios request:
  ```
  https://api.easy-orders.net/api/v1/products/slug/clear-theme/Sneakers12?join=reviews
  ```
- Optional React Query caching
- Mock “Popular”, “Related”, and Reviews

### **UI**
- TailwindCSS components
- Custom container class
- CDN font (Clash Grotesk)
- Fully responsive

---

## 🧱 Tech Stack
- React 18  
- TypeScript  
- Tailwind CSS  
- Zustand + Immer + Persist  
- Axios  
- react-medium-image-zoom  
-  @tanstack/react-query  

---
 

## 🧠 State Stores

### **`useProductStore`**
**State**
- product, loading, error
- selectedVariations
- selectedVariant

**Actions**
- `fetchProduct(slug)`
- `setSelectedVariation(type, value)`
- `clearSelectedVariations()`

**Computed**
- `findMatchingVariant()`
- `getCurrentPrice()`
- `getCurrentSalePrice()`
- `isVariantAvailable()`

**Persistence:** sessionStorage

---

### **`useCartStore`**
**State**
- items
- isOpen

**Actions**
- `addItem(product, variant, qty)`
- `removeItem(id)`
- `updateQty(id, qty)`
- `clear()`

**Computed**
- `count()`
- `subtotal()`

**Persistence:** localStorage

---

### **`useCartDrawerStore`**
- `isOpen`
- `open()`, `close()`, `toggle()`

---

## 🖼 Components Overview

### **ProductDetail**
- Calls `fetchProduct("Sneakers12")`
- Renders ProductImage + ProductInfo
- Checkout opens drawer

### **ProductImage**
- Uses `thumb + images`
- Zoomable main image
- Thumbnails + arrow navigation
- Keyboard accessible

### **ProductInfo**
- Category label
- Dynamic pricing block
- HTML description (4-line clamp)
- Variations (color/size)
- Stock indicator
- Add to cart + Checkout

---

## 🔤 Fonts Setup (`index.css`)

```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: "Clash Grotesk", system-ui, sans-serif;
}

@layer components {
  .container {
    @apply max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8;
  }
}

.zoom-box > * {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

 
---

## 🧪 Testing Guidelines

### Test stores:
- Product variation selection logic
- Matching variants
- Cart merge/add/remove/update
- Subtotal calculations
- Drawer open/close
- Persistence mocking

### Test components:
- Description expand/collapse
- Variation clicks
- Gallery arrows + thumbnails
- Drawer subtotal updates

---

## 🚀 Getting Started

```bash
# create app
npx create-react-app product-page-task --template typescript
cd product-page-task

# dependencies
npm i zustand immer axios react-medium-image-zoom
npm i -D tailwindcss @tailwindcss/forms @tailwindcss/typography

# optional
npm i @tanstack/react-query

# init tailwind
npx tailwindcss init -p

# run
npm start
```

 
