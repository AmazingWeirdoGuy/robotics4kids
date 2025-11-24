# R4K - Robotics for Kids Website

A modern, frontend-only website for the Robotics for Kids club, built with React, TypeScript, and Vite.

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev
```

The site will be available at `http://localhost:5000`

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready to deploy to Vercel or any static hosting service.

## 📝 Managing Content

### Editing News Items

All news content is stored in `client/src/data/newsData.ts`. To add, edit, or remove news items:

1. Open `client/src/data/newsData.ts` in your code editor
2. Add/edit/remove items from the `newsData` array
3. Each news item has the following structure:

```typescript
{
  id: number;              // Unique ID
  title: string;           // News title
  date: string;            // Display date (e.g., "Nov 20, 2025")
  category: string;        // Category (e.g., "Competition", "Events")
  description: string;     // Full description
  iconName: string;        // Icon name: "Trophy", "Calendar", "Zap", or "MapPin"
}
```

4. Save the file
5. Commit and push to GitHub
6. Vercel will automatically redeploy

### Example: Adding a New News Item

```typescript
{
  id: 5,
  title: "Summer Robotics Camp",
  date: "Jun 15, 2025",
  category: "Announcement",
  description: "Join us for a week-long intensive robotics camp this summer!",
  iconName: "Calendar",
}
```

## 📁 Project Structure

```
client/
  ├── src/
  │   ├── components/     # Reusable UI components
  │   ├── data/          # Data files (newsData.ts)
  │   ├── pages/         # Page components
  │   └── lib/           # Utilities
  ├── public/            # Static assets
  └── index.html         # Entry HTML
```

## 🎨 Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Wouter** - Routing
- **Framer Motion** - Animations

## 🚢 Deployment

This site is designed to be deployed on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a Vite project
3. Every push to `main` will trigger a new deployment
4. No environment variables or build configuration needed

## 📱 Pages

- **Home** (`/`) - Hero, stats, courses, activities, and latest news
- **About** (`/about`) - Mission and team information  
- **News** (`/news`) - All news articles
- **Contact** (`/contact`) - Contact form and information

---

Built with ❤️ by the R4K team
