# E-commerce Platform

A modern e-commerce platform built with Next.js, TypeScript, and Zustand. Features include product browsing, cart management, and Paystack payment integration.

## Features

- 🛍️ Product browsing and search
- 🛒 Shopping cart functionality
- 💳 Paystack payment integration
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Paystack account (for payment processing)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ecommerce-platform/
├── app/                # Next.js app directory
├── components/         # React components
├── lib/               # Utility functions and services
├── public/            # Static assets
└── styles/            # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Payment Integration

This project uses Paystack for payment processing. To enable payments:

1. Sign up for a Paystack account
2. Get your public key from the Paystack dashboard
3. Add the public key to your `.env.local` file

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
