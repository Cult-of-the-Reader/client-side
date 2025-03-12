# Client-Side Project Documentation

## Project Structure

This document outlines the structure of the client-side React application built with Vite.

```
client-side/
├── public/
│   ├── favicon-16x16.png         # Small favicon
│   ├── favicon-32x32.png         # Medium favicon
│   └── favicon.ico               # Main favicon
├── src/
│   ├── assets/
│   │   ├── hero.jpg              # Main hero image
│   │   └── logo.webp             # Site logo
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── AuthForm.css      # Authentication form styles
│   │   │   └── AuthForm.jsx      # Authentication form component
│   │   ├── Global/
│   │   │   ├── Cart.css          # Cart styles
│   │   │   ├── Cart.jsx          # Cart component
│   │   │   ├── ErrorMessage.css  # Error message styles
│   │   │   ├── ErrorMessage.jsx  # Error message component
│   │   │   ├── LoadingSpinner.css # Loading spinner styles
│   │   │   └── LoadingSpinner.jsx # Loading spinner component
│   │   ├── Home/
│   │   │   ├── BookList.css      # Book list styles
│   │   │   ├── BookList.jsx      # Book list component
│   │   │   ├── Header.css        # Header styles
│   │   │   ├── Header.jsx        # Header component
│   │   │   ├── Hero.css          # Hero section styles
│   │   │   └── Hero.jsx          # Hero section component
│   │   ├── Product/
│   │   │   ├── BookContent.css   # Book content styles
│   │   │   └── BookContent.jsx   # Book content component
│   │   └── Profile/
│   │       ├── ProfileForm.css   # Profile form styles
│   │       └── ProfileForm.jsx   # Profile form component
│   ├── contexts/
│   │   ├── AuthContext.jsx       # Authentication context
│   │   └── CartContext.jsx       # Shopping cart context
│   ├── hooks/
│   │   └── useCart.jsx           # Custom cart hook
│   ├── pages/
│   │   ├── Book.jsx              # Book detail page
│   │   ├── Home.jsx              # Home page
│   │   ├── Login.jsx             # Login page
│   │   ├── Profile.jsx           # User profile page
│   │   └── Register.jsx          # Registration page
│   ├── services/
│   │   └── api.js                # API services
│   ├── App.css                   # Main application styles
│   ├── App.jsx                   # Main application component
│   ├── index.css                 # Global styles
│   └── main.jsx                  # React entry point
├── .gitignore                    # Git ignore configuration
├── eslint.config.js              # ESLint configuration
├── index.html                    # Main HTML file
├── package-lock.json             # Dependencies version lock
├── package.json                  # Project configuration and dependencies
├── README.md                     # Project documentation
├── static.json                   # Static files configuration
└── vite.config.js                # Vite configuration
```

## Application Overview

This project appears to be a bookstore or e-commerce application for books with user authentication, shopping cart functionality, and profile management capabilities.

## Key Components

### Authentication
- Located in `src/components/Auth/` and `src/contexts/AuthContext.jsx`
- Handles user registration, login, and authentication state management

### Shopping Cart
- Located in `src/components/Global/Cart.jsx` and `src/contexts/CartContext.jsx`
- Custom hook in `src/hooks/useCart.jsx` for cart functionality
- Manages shopping cart state and operations

### Book Catalog
- Main book listing in `src/components/Home/BookList.jsx`
- Detailed book information in `src/components/Product/BookContent.jsx`
- Book pages in `src/pages/Book.jsx` and `src/pages/Home.jsx`

### User Profile
- Profile management in `src/components/Profile/ProfileForm.jsx`
- Profile page in `src/pages/Profile.jsx`

### Global Components
- Header in `src/components/Home/Header.jsx`
- Hero section in `src/components/Home/Hero.jsx`
- Error handling in `src/components/Global/ErrorMessage.jsx`
- Loading indicator in `src/components/Global/LoadingSpinner.jsx`

### API Services
- API communication handled in `src/services/api.js`

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Main Dependencies

Please refer to `package.json` for a complete list of dependencies and their versions.
