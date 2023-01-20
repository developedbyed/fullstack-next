import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "pages/api/auth/[...nextauth]"
import Login from "./auth/Login"
import Logged from "./auth/Logged"

export default async function Nav() {
  const session = await unstable_getServerSession(authOptions)

  return (
    <nav className="flex justify-between py-12 ">
      <h1>Logo</h1>
      <ul className="flex items-center gap-6"></ul>
      {!session && <Login />}
      {session && <Logged image={session.user.image} />}
    </nav>
  )
}
