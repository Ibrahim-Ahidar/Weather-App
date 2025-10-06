# Weather App - React + Vite + Material UI

A modern React application built with Vite, Material UI, and Axios for making HTTP requests.

## Features

- ⚡ **Vite** - Lightning fast build tool and dev server
- ⚛️ **React 19** - Latest React with modern features
- 🎨 **Material UI** - Beautiful, accessible React components
- 🌐 **Axios** - Promise-based HTTP client
- 📱 **Responsive Design** - Mobile-friendly layout
- 🎯 **TypeScript Ready** - Easy to add TypeScript support

## Tech Stack

- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool and dev server
- **Material UI 7.3.4** - Component library
- **Axios 1.12.2** - HTTP client
- **Emotion** - CSS-in-JS styling

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Application styles
├── main.jsx         # Application entry point with Material UI theme
└── index.css        # Global styles
```

## Features Included

- ✅ Material UI theme setup
- ✅ Responsive grid layout
- ✅ Sample API integration with Axios
- ✅ Loading states and error handling
- ✅ Modern UI components
- ✅ Clean project structure

## Customization

### Theme

The Material UI theme can be customized in `src/main.jsx`:

```jsx
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});
```

### API Integration

Replace the sample API call in `src/App.jsx` with your own endpoints:

```jsx
const response = await axios.get("YOUR_API_ENDPOINT");
```

## License

MIT License - feel free to use this template for your projects!
