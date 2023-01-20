import "./globals.css"
import Nav from "./Nav"
import { Roboto } from "@next/font/google"
import AuthContext from "./auth/AuthContext"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={`max-w-6xl m-auto ${roboto.variable} font-sans`}>
        <AuthContext>
          <Nav />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
