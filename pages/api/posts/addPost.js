import prisma from "../../../prisma/client"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ message: "Please signin to create a post." })
  }

  const { title } = JSON.parse(req.body)
  //Get User
  const prismaUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  })
  if (req.method === "POST") {
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      })

      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a post" })
    }
  }
}
