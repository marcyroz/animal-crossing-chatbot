import type { Metadata } from "next";
import {Fuzzy_Bubbles} from "next/font/google";
import "./globals.css";

const fuzzyBubbles = Fuzzy_Bubbles({
  subsets: ["latin"],
  weight: ["400", "700"], // add weights you need
});

export const metadata: Metadata = {
  title: "Animal Crossing Chatbot",
  description: "Chat about your favorite Game!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fuzzyBubbles.className} antialiased font-medium`}
      >
        {children}
      </body>
    </html>
  );
}
