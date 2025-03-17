import type { Metadata, Viewport } from "next";
import "./globals.css";
import DevTools from "@/components/DevTools";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

// viewport 설정을 별도로 내보내기
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000", // themeColor를 여기로 이동
};

// 메타데이터 설정
export const metadata: Metadata = {
  title: "Next.js PWA",
  description: "Progressive Web App built with Next.js",
  // themeColor는 viewport 설정으로 이동
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Next.js PWA",
  },
  applicationName: "Next.js PWA",
  icons: {
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body className={`antialiased`}>
        {children}

        <ServiceWorkerRegistration />
        <DevTools />
      </body>
    </html>
  );
}
