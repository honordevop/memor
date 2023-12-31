import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Inter, Lobster } from "next/font/google";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

const lobster = Lobster({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-lobster",
});
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${lobster.variable}`}>
        <AuthProvider>
          <Navbar />
          {children}
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
