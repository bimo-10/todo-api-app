import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// const inter = Inter({ subsets: ["latin"] });

const fontsans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Todo App",
  description: "Todo App with Next.js and Prisma",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontsans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
