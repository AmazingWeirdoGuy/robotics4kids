# R4K - Robotics for Kids Website

## Overview

R4K (Robotics for Kids) is a frontend-focused website for a high school student-led organization that provides robotics and programming education to children across Thailand and ASEAN. The website showcases the organization's mission, news updates, school partnerships, team information, and contact details. Built as a modern single-page application using React, TypeScript, and Vite, it emphasizes clean design, performance, and ease of content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack:**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, configured to serve from port 5000
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **Framer Motion** for animations and transitions

**UI Component System:**
- **shadcn/ui** component library based on Radix UI primitives
- **Tailwind CSS v4** for styling with custom design tokens
- Components follow the "New York" style variant with custom theming
- Custom design system featuring:
  - Light/white technology palette with blue-600 accents, black text, slate greys
  - White and light grey backgrounds, dark footer for contrast
  - Clean card shadows and subtle borders (no glassmorphism)
  - Custom fonts: "DM Sans" for body, "Space Grotesk" for headings

**Project Structure:**
- `/client` - All frontend code
  - `/src/pages` - Page components (Home, About, News, Contact, Admin)
  - `/src/components` - Reusable components and UI library
  - `/src/data` - Static data files (newsData.ts)
  - `/src/hooks` - Custom React hooks
  - `/src/lib` - Utility functions
- `/attached_assets` - Static assets and images

**Key Design Decisions:**
- **Frontend-only approach**: Originally designed as a static site for deployment to Vercel or similar hosting
- **File-based content management**: News items and team data stored in TypeScript files for simplicity
- **Responsive design**: Mobile-first approach with breakpoints at 768px
- **Accessibility**: Uses semantic HTML and ARIA labels throughout

### Development Server Architecture

**Development Mode:**
- Express.js server provides API endpoints for the admin panel
- File system APIs to read/write content files (newsData.ts, About.tsx)
- Vite dev server runs on port 5000
- Hot module replacement for rapid development

**Admin Panel Features:**
- Direct file editing capabilities for news items and team information
- Simple REST API endpoints:
  - `GET/POST /api/admin/news` - Manage news data
  - `GET/POST /api/admin/team` - Manage team member information
- Environment detection (Replit vs local) for admin panel availability

**Build Process:**
- Vite handles frontend bundling and optimization
- Output directory: `dist/public`
- Production server built with esbuild
- Static assets copied to build output

### State Management

**Approach:**
- Local component state with React hooks
- No global state management library (Redux, Zustand, etc.)
- React Query (@tanstack/react-query) configured but not actively used
- Props drilling for shared state between components

**Rationale:**
- Simplicity for a content-focused website
- Limited interactivity requirements
- Easy to understand for student developers

### Content Management

**JSON-Based CMS:**
- All content stored in JSON files in `client/public/data/`:
  - `news.json` — news articles with title, date, category, description, content, iconName, image
  - `members.json` — team members grouped by class: officers, websiteManagers, facultyAdvisors, activeMembers (each with id, name, title, bio, photo, email)
  - `heroImages.json` — homepage hero carousel images with id, image, caption
  - `programs.json` — program cards with id, name, description, image, link
- Frontend pages fetch JSON on mount via `fetch("/data/filename.json")`
- Uploaded images stored in `client/public/uploads/` organized by subfolder (members/, news/, hero/, programs/)

**Admin Panel (Development Only):**
- Full CMS at `/admin` route, gated behind `import.meta.env.DEV`
- 4 tabs: Members, News, Hero Images, Programs
- Features per tab:
  - Drag-and-drop reordering via @dnd-kit (with "Save Order" button)
  - Add/Edit/Delete with Dialog forms and AlertDialog confirmations
  - Image upload with cropping via react-easy-crop (1:1 for members/programs, 16:9 for news/hero)
- Dev-only Express endpoints in `server/index-dev.ts`:
  - `POST /dev/save-json` — writes JSON to `client/public/data/`
  - `POST /dev/upload` — uploads images (via multer) to `client/public/uploads/{category}/`
  - `DELETE /dev/upload` — deletes uploaded images

**Deployment Workflow:**
1. Edit content on Replit using admin panel
2. Commit changes (JSON files + uploaded images are in the repo)
3. Push to GitHub → Vercel auto-deploys
4. Production build is static — no Express server, no dev endpoints

### Routing Strategy

**Client-Side Routing:**
- Wouter library for lightweight routing (~1.2KB)
- Routes defined in App.tsx
- Key routes:
  - `/` - Home page with hero section and latest news
  - `/about` - Organization history, mission, team, and schools
  - `/news` - Full news listing
  - `/contact` - Contact information
  - `/admin` - Content management (dev only)

**Navigation:**
- Fixed navbar with glassmorphism effect on scroll
- Mobile hamburger menu with slide-in animation
- Active route highlighting

## External Dependencies

### Third-Party UI Libraries

**Radix UI Primitives:**
- Comprehensive set of accessible, unstyled component primitives
- Includes: Dialog, Dropdown, Accordion, Tabs, Toast, and 20+ other components
- Chosen for accessibility compliance and headless architecture

**shadcn/ui:**
- Pre-built component library built on Radix UI
- Customized through `components.json` configuration
- Allows direct component source modification

**Framer Motion:**
- Animation library for page transitions and micro-interactions
- Used for hero animations, card hover effects, and mobile menu
- Note in package.json indicates it was previously removed but remains in dependencies

**Lucide React:**
- Icon library with 1000+ consistent SVG icons
- Used throughout for UI icons (Trophy, Calendar, MapPin, etc.)

### Development Tools

**Replit-Specific Plugins:**
- `@replit/vite-plugin-runtime-error-modal` - Error overlay in development
- `@replit/vite-plugin-cartographer` - Code mapping for debugging
- `@replit/vite-plugin-dev-banner` - Development environment banner
- Custom `vite-plugin-meta-images` - Updates OpenGraph meta tags with Replit domain

**Build Tools:**
- TypeScript for type checking
- PostCSS with Tailwind CSS and Autoprefixer
- esbuild for production server bundling

### Font Services

**Google Fonts:**
- DM Sans - Primary body font (variable weight 100-1000)
- Space Grotesk - Heading font (weight 300-700)
- Preconnect optimization for faster loading

### Image Assets

**Storage:**
- `/attached_assets` directory for local images
- External images loaded from r4kclub.com domain (likely original site)
- Logo stored as attached asset: `image_1763957987556.png`

**OpenGraph Images:**
- Configured for social media sharing
- Plugin automatically updates meta tags with deployment URL
- Supports PNG, JPG, JPEG formats

### Currently Unused Dependencies

**Database & ORM:**
- Drizzle ORM (`drizzle-orm`, `drizzle-zod`)
- Neon serverless Postgres client (`@neondatabase/serverless`)
- PostgreSQL session store (`connect-pg-simple`)

**Note:** These dependencies suggest future plans for database integration, but the current implementation is entirely frontend-based with file system content storage in development mode.