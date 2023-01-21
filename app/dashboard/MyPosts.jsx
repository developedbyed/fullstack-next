import prisma from "../../prisma/client"
import Image from "next/image"
import Post from "../Post"

export default async function MyPosts({ email }) {
  const data = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  return (
    <div>
      {data.posts.map((post) => (
        <div key={post.id} className="bg-gray-100 my-8 p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <Image width={48} height={48} src={data.image} alt="avatar" />
            <h3>{data.name}</h3>
          </div>
          <div>
            <h2>{post.title}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}
