import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import { GameSettingsProvider } from "@/context/game-settings-context";

export const metadata: Metadata = {
  title: "Contextualle",
  description: "Guess your word of the day from context",
};
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.className} antialiased`}>
        <GameSettingsProvider>{children}</GameSettingsProvider>
      </body>
    </html>
  );
}
