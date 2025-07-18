// app/layout.tsx
import './globals.css'; // Your Tailwind base CSS (generated by Tailwind CLI/postcss)
import React from 'react';

export const metadata = {
  title: 'URL Shortener',
  description: 'Next.js URL shortener app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
        {children}
      </body>
    </html>
  );
}
