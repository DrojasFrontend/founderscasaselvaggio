import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ApolloProvider } from '@apollo/client'
import client from './lib/apollo-client'
import ApolloWrapper from "./lib/ApolloWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Founders Casa Selvaggio",
  description: "Proyecto inmobiliario exclusivo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
