# X-MATRIX // Cybernetic Portfolio & Personal Hub

NEXUS-OS is a premium, ultra-sleek, futuristic developer portfolio website built using Next.js (App Router), Tailwind CSS v4, TypeScript, and Framer Motion animations. The site utilizes a matte black theme accentuated by neon green (`#39ff14`) and sky blue (`#87CEEB`) glows, featuring rich animations and high-tech UI presets.

---

## 🛠 Tech Stack

- **Core**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Logic**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styles**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ⚡️ Key Features

1. **Futuristic Aesthetics**: Designed with curated glassmorphism cards, glowing active states, and ambient particle backdrops.
2. **Custom Animated Cursor**: A smooth spring-damped pointer circle trailing overlay that adapts, expands, and changes colors depending on interactive element mouse hover states.
3. **Typewriter Tagline Carousel**: A custom client-side typewriter loop rendering professional disciplines seamlessly.
4. **Infinite Marquee Scroll**: A smooth marquee ribbon highlighting core technical skill tags continuously.
5. **Dynamic Mockup Visuals**: Responsive SVG-based software visual interfaces (network nodes, ledger diagrams, targeting grids) designed to replace basic profile images and screenshots.
6. **Glassmorphism Message Signal Form**: Minimal input fields with neon active outlines and submission response notifications.

---

## 📂 Project Structure

```text
├── public/                 # Static assets
└── src/
    ├── app/                # Next.js App Router entry points
    │   ├── globals.css     # Design tokens, neon styles, custom scrollbar
    │   ├── layout.tsx      # Google Fonts loading & SEO Metadata configuration
    │   └── page.tsx        # Homepage layout assembly
    └── components/         # Reusable React components
        ├── CustomCursor.tsx# Spring animated cursor tracker
        ├── Navbar.tsx      # Sticky glass shrinking navigation
        ├── Hero.tsx        # Title section & typewriter loop
        ├── About.tsx       # Bio data & vector cybernetic head avatar
        ├── Skills.tsx      # Marquee ticker & categorized progress grids
        ├── Projects.tsx    # Features grid with customized vector screens
        ├── Contact.tsx     # Message signal form & success modals
        └── Footer.tsx      # Copyright logs & host port diagnostics
```

---

## 🚀 Getting Started

To run the project locally on your machine:

### 1. Requirements

Ensure you have **Node.js** (v18.0.0 or higher) installed.

### 2. Dependencies

Install all packages:

```bash
npm install
```

### 3. Development Server

Run the local dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the system.

### 4. Build

To compile the site for production:

```bash
npm run build
```

This builds an optimized static bundle into the `.next` directory.

---

## 📜 Accessibility (A11y) & SEO Compliance

- Semantically structured HTML elements (`<header>`, `<main>`, `<section>`, `<footer>`, etc.).
- Active color contrast configurations supporting readable text levels.
- Comprehensive search metadata (keywords, descriptions, authors) embedded dynamically.
- Accessible buttons and toggle menu configurations matching viewport rules.
