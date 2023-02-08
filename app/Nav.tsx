import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import { signIn } from "next-auth/react"
import Login from "./auth/Login"
import Logged from "./auth/Logged"
import Link from "next/link"

export default async function Nav() {
  const session = await unstable_getServerSession(authOptions)

  return (
    <nav className="flex justify-between items-center py-8 ">
      <Link href={"/"}>
        <h1 className="font-bold text-lg">SendIt.</h1>
      </Link>
      <ul className="flex items-center gap-6"></ul>
      {!session?.user && <Login />}
      {session?.user && <Logged image={session.user.image || ""} />}
    </nav>
  )
}
