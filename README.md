# TIMOCOM Integration Frontend

A modern Next.js frontend application for managing TIMOCOM freight and vehicle space offers. Built with TypeScript, Tailwind CSS, and React components.

## Features

- 🚛 **Freight Offers Management** - View, create, edit, and delete freight offers
- 🚚 **Vehicle Space Offers** - Manage available vehicle space offers
- 📊 **Dashboard** - Overview of all offers with status tracking
- 🔄 **Real-time Updates** - Live connection status with TIMOCOM API
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS

## Prerequisites

- Node.js 18+
- npm or yarn
- The timocom-integration backend server running

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.local.example .env.local
   ```
   Update `.env.local` with your backend API URL (default: `http://localhost:3001`)

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── freight/        # Freight offer components
│   └── vehicle/        # Vehicle space offer components
├── lib/                # Utilities and API client
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## API Integration

The frontend communicates with the timocom-integration backend API:

- **Base URL:** `http://localhost:3001` (configurable via environment)
- **Endpoints:**
  - `GET /api/timocom/test` - Test TIMOCOM connection
  - `GET /api/timocom/freight-offers` - List freight offers
  - `POST /api/timocom/freight-offers` - Create freight offer
  - `GET /api/timocom/vehicle-space-offers` - List vehicle space offers
  - `POST /api/timocom/vehicle-space-offers` - Create vehicle space offer

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3001` |

## Development

- **Dev server:** `npm run dev`
- **Build:** `npm run build`
- **Start production:** `npm start`
- **Lint:** `npm run lint`

## Technologies Used

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Headless UI** - Accessible components

## Backend Integration

This frontend is designed to work with the timocom-integration backend server. Make sure the backend is:

1. Running on port 3001 (or update `NEXT_PUBLIC_API_URL`)
2. Properly configured with TIMOCOM credentials
3. CORS enabled for frontend requests

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test components thoroughly
4. Update documentation as needed

## License

This project is part of the SK Group timocom-integration system.
