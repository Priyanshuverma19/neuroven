import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Opt out of instant-navigation blocking check for dynamic lang segments
export const instant = false;

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "he" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#111827]">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
