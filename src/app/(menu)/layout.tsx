import "@/app/globals.css";

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="app-container">
      <div className="menu-wrapper">{children}</div>
    </div>
  );
}
