import './globals.css';
import { Inter } from 'next/font/google';
import RootTemplate from './components/RootTemplate';
import { colors } from '@/app/styles/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Galaxy AI - Lab Intelligence Platform',
  description: 'AI-powered analytics and insights for laboratory management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[${colors.background}]`}>
        <RootTemplate>
          {children}
        </RootTemplate>
      </body>
    </html>
  );
} 