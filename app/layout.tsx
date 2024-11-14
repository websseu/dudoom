import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "DUDOOM - Netflix Movie Insights",
  description:
    "DUDOOM은 넷플릭스 인기 영화, TOP10, 트렌딩 및 인기 작품에 대한 최신 정보를 제공하는 사이트입니다. 넷플릭스와 관련된 영화, 드라마 및 인기 콘텐츠의 분석과 트렌드를 제공합니다.",
  keywords: [
    "DUDOOM",
    "Netflix",
    "영화 정보",
    "넷플릭스 인기 콘텐츠",
    "넷플릭스 TOP10",
    "영화 트렌드",
  ],
  openGraph: {
    title: "DUDOOM - Netflix Movie Insights",
    description:
      "넷플릭스의 인기 영화 및 트렌딩 콘텐츠에 대한 최신 정보를 제공합니다.",
    url: "https://www.dudoom.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DUDOOM - Netflix Movie Insights",
    description:
      "넷플릭스 인기 영화 및 트렌딩 콘텐츠에 대한 최신 정보를 제공합니다.",
    site: "@DUDOOM",
    images: ["https://www.dudoom.com/dudoom.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
