import "./globals.css";

export const metadata = {
  title: "FleetControl | מערכת לניהול צי רכב",
  description: "מערכת ניהול צי רכב עם לשוניות מרכזיות לניהול תהליכים."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
