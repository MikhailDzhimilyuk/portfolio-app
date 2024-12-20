import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/components/AuthProvider/AuthProvider';
import './globals.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Portfolio App",
  description: "Portfolio App is an application that uses a variety of technologies and showcases my professional skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <ThemeProvider>
            <AuthProvider>
              <div className="container">
                <Navbar/>
                {children}
                <Footer/>
              </div>
            </AuthProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
