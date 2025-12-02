<div align="center">

  <img src="https://i.ibb.co/Jw147FQQ/Screenshot-2025-12-02-at-21-37-05.png" alt="FootBookr Banner" width="100%" />

# ⚽ FootBookr

**The modern platform for booking football pitches.** _Manage venues, track revenue, and book matches seamlessly._

  <p>
    <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.dot.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Prisma-ORM-2d3748?style=for-the-badge&logo=prisma" alt="Prisma" />
    <img src="https://img.shields.io/badge/Better_Auth-Secure-orange?style=for-the-badge" alt="Auth" />
  </p>
</div>

---

## ✨ Features

### 🏟️ For Players

- **Real-time Availability:** Browse pitches and see live slot availability.
- **Smart Booking:** Filter by 5-a-side vs 7-a-side, date, and time.
- **Digital Tickets:** QR Code generation for seamless check-in at the venue.
- **User Dashboard:** Manage upcoming matches and view booking history.
- **Social Login:** One-click sign-in with Google or Email.

### ⚡ For Admins

- **Analytics Dashboard:** Visual revenue charts, occupancy heatmaps, and KPI cards.
- **Venue Management:** Add or delete pitches with image uploads.
- **Booking Control:** View all reservations, cancel bookings, and manage schedules.
- **User Management:** View user stats and manage permissions.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components, Server Actions, Data Access Layer)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (via [Prisma ORM](https://www.prisma.io/))
- **Authentication:** [BetterAuth](https://better-auth.com/)
- **Charts:** [Recharts](https://recharts.org/) / Shadcn Charts
- **Icons:** [Lucide React](https://lucide.dev/)
- **Utilities:** `date-fns` (Time), `zod` (Validation), `react-hook-form` (Forms)

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Prerequisites

- Node.js 18+
- pnpm (Recommended)
- PostgreSQL Database (Local or Vercel/Supabase)

### 2. Clone & Install

```bash
git clone https://github.com/saidMounaim/footbookr
cd footbookr

# Install dependencies using pnpm
pnpm install
```

### 3. Environment Variables

Create a .env file in the root directory and populate it with your keys:

```bash
DATABASE_URL=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

IMAGEKIT_PUBLIC_KEY=""
IMAGEKIT_PRIVATE_KEY=""
IMAGEKIT_URL_ENDPOINT=""
```

### 4. Create Admin User & Mock Data:

To access the Admin Panel immediately, you must seed the database.

Open the seed file at `prisma/seed.ts`.

Edit the admin credentials inside the file (email/password) to what you want to use for logging in.

Run the seed command:

```bash
npx prisma db seed
```

This command create your Admin account.

### 5. Run the App

Start the development server:

```bash
pnpm dev
```

Visit http://localhost:3000 to see the app live.

---

### 🤝 Contributing

Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch: `git checkout -b feature/new-feature`

Commit your changes: `git commit -m 'Add some feature'`

Push to the branch: `git push origin feature/new-feature`

Submit a pull request.
