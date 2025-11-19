# HealthLink MVP

A comprehensive healthcare management platform built with React, Vite, TailwindCSS, and Node.js.

vercel deployment link:

https://healthlink-gold.vercel.app/
render deployment link

https://healthlink-ixpb.onrender.com/

## 🚀 Features

- **Modern Frontend**: React 18 + Vite + TailwindCSS
- **Dark Mode**: Full dark mode support with localStorage persistence
- **Responsive Design**: Mobile-first, fully responsive UI
- **Medical Triage**: Comprehensive 5-step triage form
- **Dashboard**: Patient dashboard with appointments and health metrics
- **Authentication**: Login and registration pages

## 📦 Project Structure

```
healthlink-mvp/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── context/      # React context (Theme)
│   │   ├── pages/        # Page components
│   │   ├── App.jsx       # Main app component
│   │   ├── main.tsx      # Entry point
│   │   └── index.css     # Global styles
│   └── package.json
└── backend/           # Node.js + Express backend
    ├── config/        # Database configuration
    ├── server.js      # Express server
    └── package.json
```

## 🛠️ Installation

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:5000`

## 🌐 Deployment

### Vercel (Frontend)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set the root directory to `frontend`
4. Deploy

The `vercel.json` configuration is already included for proper routing.

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## 📱 Pages

- **Home** (`/`) - Landing page with features and CTAs
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New user registration
- **Dashboard** (`/dashboard`) - Patient dashboard
- **Triage** (`/triage`) - Medical triage form

## 🎨 Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- React Router DOM
- Context API (Theme Management)

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

## 👨‍💻 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
