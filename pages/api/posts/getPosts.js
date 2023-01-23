import prisma from "../../../prisma/client"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })

      return res.status(200).json(data)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a post" })
    }
  }
}
