# Gifly - GIF Search & Discovery

A modern, responsive GIF search application built with React, Vite, and Tailwind CSS. Search and discover amazing GIFs using the Giphy API.

## Features

- 🔍 **Search GIFs** - Search for any GIF using the Giphy API
- 📈 **Trending GIFs** - Discover what's popular right now
- 🎲 **Random GIFs** - Get a random GIF for fun
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🌙 **Dark/Light Theme** - Toggle between themes
- 💾 **Search History** - Local storage for your recent searches
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **UI Components**: Radix UI, Lucide React icons
- **API**: Giphy API (direct integration)
- **State Management**: React Hooks
- **Styling**: Tailwind CSS with custom components

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gifly
```

2. Install dependencies:
```bash
cd frontend
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   ├── contexts/      # React contexts
│   ├── lib/           # Utility functions
│   └── main.jsx       # App entry point
├── public/            # Static assets
└── package.json       # Dependencies and scripts
```

## API Configuration

The app uses the Giphy API directly from the frontend. The API key is configured in `src/services/gifService.js`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
