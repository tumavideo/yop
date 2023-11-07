import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import { Database } from "@/lib/database.types";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./styles/globals.css";
export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "InLight Zambia",
  description:
    "Government Programs, Jobs, Skills Development & Finance Opportunities",
  openGraph: {
    type: "website",
    title: "InLight Zambia",
    description:
      "Government Programs, Jobs, Skills Development & Finance Opportunities",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <head>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="bg-gray-100">
        <Header session={session} />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
