import 'bootstrap/dist/css/bootstrap.css';
import "./styles/modal.css";
import "./styles/theme.css";

import Subscribe from "@/components/Subscribe";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import dynamic from 'next/dynamic';

const DynamicBootstrap = dynamic(
  () => require('bootstrap/dist/js/bootstrap.min.js'),
  { ssr: false }
);

export const metadata = {
  title: 'Zambia Rise | Government Programs, Jobs, Skills Development & Finance Opportunities',
  description: 'Empower your future with Zambia Rise – Your gateway to discover government initiatives, job openings, skill-building resources, and financial opportunities in Zambia. Unleash your potential today!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossOrigin="anonymous"></script>
      </head>
      <body>
        <Header />
        {children}
        <Subscribe />
        <Footer />
      </body>
    </html>
  )
}
