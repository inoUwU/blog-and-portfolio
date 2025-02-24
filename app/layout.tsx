import "./globals.css";
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

