import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import { Database } from "@/lib/database.types";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./styles/globals.css";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "InLight Zambia | Government Programs, Jobs, Skills Development & Finance Opportunities",
  description:
    "Empower your future with InLight Zambia – Your gateway to discover government initiatives, job openings, skill-building resources, and financial opportunities in Zambia. Unleash your potential today!",
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
      <body className="bg-white">
        <Header session={session} />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
