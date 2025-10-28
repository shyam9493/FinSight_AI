# FinSight AI - Frontend

A modern, responsive landing page for FinSight AI with authentication and contact form.

## Features

✨ **Clean UI** - Built with Tailwind CSS
🌓 **Dark/Light Theme** - Persistent theme toggle with localStorage
🔐 **Authentication** - Clerk integration for secure sign-in
📧 **Contact Form** - EmailJS integration for direct messaging
📱 **Responsive** - Mobile-first design

## Setup Instructions

### 1. Install Dependencies

```powershell
npm install
```

### 2. Configure Environment Variables

Create or update `.env.local` file in the frontend directory:

```env
# Clerk Authentication
# Get your keys from https://dashboard.clerk.com
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here

# EmailJS Configuration  
# Get your credentials from https://dashboard.emailjs.com
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 3. Clerk Setup

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Copy the **Publishable Key** 
4. Add it to `.env.local` as `VITE_CLERK_PUBLISHABLE_KEY`

### 4. EmailJS Setup

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Copy Service ID, Template ID, and Public Key
5. Add them to `.env.local`

### 5. Run Development Server

```powershell
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

```powershell
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── App.tsx          # Main landing page component
│   ├── main.tsx         # Entry point with Clerk provider
│   ├── index.css        # Tailwind imports and global styles
│   └── App.css          # Component-specific styles
├── tailwind.config.js   # Tailwind configuration
├── vite.config.ts       # Vite configuration
└── .env.local           # Environment variables (not committed)
```

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Clerk** - Authentication
- **EmailJS** - Email service

## Notes

- Theme preference is saved to localStorage
- Sign-in modal is provided by Clerk
- Contact form validates before sending
- All environment variables must start with `VITE_` to be accessible in the browser

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
