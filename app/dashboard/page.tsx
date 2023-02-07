import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import MyPosts from "./MyPosts"

export default async function Dashboard() {
  const session = await unstable_getServerSession(authOptions)
  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome back {session?.user?.name}</h1>
      <MyPosts />
    </main>
  )
}
