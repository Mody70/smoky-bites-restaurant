import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "سموكي بايتس | طلب برجر وفرايد تشيكن",
  description:
    "موقع طلبات مطعم احترافي كمفهوم بورتفوليو مع إرسال الطلب على واتساب.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
