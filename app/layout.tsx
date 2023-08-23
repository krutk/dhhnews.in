import "./globals.css";
import type { Metadata } from "next";
import {
  Inter,
  Saira_Stencil_One,
  Instrument_Sans,
  Unbounded,
} from "next/font/google";
import Provider from "./context/AuthContext";
import Navbar from "../components/navbar";
import PostsProvider from "@/components/contexts/PostsContext";
import UsersProvider from "@/components/contexts/UsersContext";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const sairaStencilOne = Saira_Stencil_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-saira-stencil-one",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-sans",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-unbounded",
});

export const metadata: Metadata = {
  title: "DHHNews",
  description: "A Website solely for news about Desi Hip Hop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sairaStencilOne.variable} ${instrumentSans.variable} ${unbounded.variable}`}
      >
        <Provider>
          <div>
            <PostsProvider>
              {/* <UsersProvider> */}
              <Navbar />
              <div className="bg-white sm:px-20 px-4">{children}</div>

              {/* </UsersProvider> */}
            </PostsProvider>
          </div>
        </Provider>
      </body>
    </html>
  );
}
