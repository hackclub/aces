# 🃏 Aces

Welcome to **Aces**, the official website for Hack Club's ultimate board/card game hackathon! 

**Live Site:** [aces.hackclub.com](https://aces.hackclub.com)

## 🎯 What is Aces?

Aces is an exciting opportunity for game developers and creators to:

1. **Build a digital board or card game** - Create a virtual game in 40 hours
2. **Get a grant** - Receive funding to manufacture your game in real life
3. **Attend AwesomeCon** - Get free tickets to AwesomeCon, a major DC convention
4. **Join The Deck** - Participate in a 48-hour hackathon in Washington DC (March 13-15)

This website serves as the central hub for the event, providing information, handling RSVPs, and showcasing participant projects.

## 🎮 Event Requirements

To participate in Aces and get invited to The Deck, you must meet these requirements:

- **🚫 NO AI ART** - All non-programming assets must be created by humans
- **⏰ 40 hours logged** - Log at least 40 hours of work covering both art and code (tracked via Hackatime)
- **🤖 ≤ 30% AI code** - No more than 30% of the game's code can be AI-written
- **📝 Human-written README** - The README must be authored by humans
- **📖 FOSS** - Your game must be public on GitHub with a clear license
- **🚢 Shipped** - The built game must be published on itch.io or Steam

## 🏗️ Project Architecture

This is a **Next.js 15** application built with:

### Technology Stack

- **Framework:** [Next.js 15](https://nextjs.org) with Turbopack
- **Runtime:** Node.js / Bun
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Library:** React 19
- **Icons:** React Icons
- **Data Fetching:** SWR
- **Fonts:** Google Fonts (Outfit)

### Project Structure

```
aces/
├── public/              # Static assets
│   ├── aces_logo.svg    # Main logo
│   ├── aces_card.svg    # Card graphics
│   └── favicons/        # Favicon files
├── src/
│   ├── components/      # React components
│   │   ├── Button.tsx   # Reusable button component
│   │   ├── Card.tsx     # Card display component
│   │   ├── FAQCard.tsx  # FAQ section component
│   │   ├── Flag.tsx     # Flag component
│   │   ├── Footer.tsx   # Footer component
│   │   ├── ForbiddenPopup.tsx # Error popup
│   │   ├── Meta.tsx     # SEO metadata
│   │   ├── Navbar.tsx   # Navigation bar
│   │   └── RSVP.tsx     # RSVP counter component
│   ├── pages/           # Next.js pages
│   │   ├── _app.tsx     # App wrapper with global styles
│   │   ├── _document.tsx # HTML document structure
│   │   ├── index.tsx    # Main landing page
│   │   └── api/         # API routes
│   │       └── git.ts   # GitHub API integration
│   └── styles/          # Global styles
├── Dockerfile           # Docker configuration
├── next.config.ts       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or later, OR
- **Bun** 1.x or later

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hackclub/aces.git
   cd aces
   ```

2. **Install dependencies**

   Using npm:
   ```bash
   npm install
   ```

   Or using Bun (faster):
   ```bash
   bun install
   ```

### Development

Run the development server with hot reload:

```bash
npm run dev
# or
bun dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

The page auto-updates as you edit files. Try modifying `src/pages/index.tsx` to see changes in real-time!

### Building for Production

Build an optimized production bundle:

```bash
npm run build
# or
bun run build
```

### Running in Production

After building, start the production server:

```bash
npm start
# or
bun start
```

## 🐳 Docker Deployment

The project includes a Dockerfile for containerized deployment:

1. **Build the Docker image:**
   ```bash
   docker build -t aces .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 aces
   ```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🔧 How the Code Works

### Main Components

#### Landing Page (`src/pages/index.tsx`)
The main page features:
- **Hero Section** - Logo, event description, and RSVP button
- **Interactive Card** - Clickable card that reveals event details
- **Requirements Section** - Lists all participation requirements
- **FAQ Section** - Expandable FAQ items with detailed answers

#### API Routes

**`/api/git.ts`** - Fetches the latest commit information from the GitHub repository
- Caches the result to reduce API calls
- Returns commit hash and message
- Switches between `main` and `dev` branches based on environment

#### Styling System

The project uses **Tailwind CSS** with a custom rose/red color scheme:
- Responsive design (mobile-first approach)
- Custom button components with color variants
- Smooth animations and transitions

#### State Management

Uses React hooks for local state:
- `useState` for component state (modals, FAQs, forms)
- `useEffect` for side effects (query params, data fetching)
- `useRouter` from Next.js for navigation and URL handling

### Key Features

1. **RSVP System** - Integrates with Hack Club forms for event registration
2. **Referral Tracking** - Supports `?ref={id}` query parameters for tracking referrals
3. **Error Handling** - Custom 404 and forbidden pages via query parameters
4. **SEO Optimization** - Meta component for social media previews
5. **Responsive Design** - Works seamlessly on mobile, tablet, and desktop

## 🛠️ Development Commands

```bash
npm run dev        # Start development server with Turbopack
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint to check code quality
npm run lint:fix   # Automatically fix linting issues
```

## 🤝 Contributing

We welcome contributions! If you're here to contribute to the Gallery or other features:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting: `npm run lint:fix`
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- The project uses ESLint for code quality
- Tailwind CSS for styling (avoid inline styles)
- TypeScript for type safety
- Follow the existing component structure

## 📚 Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Next.js GitHub](https://github.com/vercel/next.js) - Contribute to Next.js

### Hack Club Resources
- [Hack Club](https://hackclub.com) - The main Hack Club website
- [Hack Club Slack](https://hackclub.com/slack) - Join the community

## 📝 License

This project is open source. Please include a clear license (WTFPL recommended!) for any games you create.

## 🎉 Event Information

**When:** March 13-15, 2025  
**Where:** Washington DC  
**What:** 48-hour hackathon with free AwesomeCon tickets  
**Capacity:** 750 participants  

For more details, visit [aces.hackclub.com](https://aces.hackclub.com) or join the Hack Club Slack!

---

Built with ❤️ by Hack Clubbers
