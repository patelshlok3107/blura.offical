import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "blüra — Premium Himalayan Mineral Water",
  description: "blüra is a premium natural mineral water sourced from the Himalayan foothills, bottled in eco-friendly aluminum. Pure. Balanced. Refreshing. Elevate Yourself.",
  keywords: "blüra, Himalayan mineral water, premium water, natural mineral water, aluminum can water, eco-friendly water",
  openGraph: {
    title: "blüra — Elevate Yourself",
    description: "Natural mineral water sourced from the Himalayan foothills. A moment of clarity in a chaotic world.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
        <CustomCursor />
        <ScrollProgress />
        <FloatingWhatsApp />
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}


