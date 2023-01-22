import prisma from "../../prisma/client"
import EditPost from "./EditPost"

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
        include: {
          comments: true,
        },
      },
    },
  })

  return (
    <div>
      {data.posts.map((post) => (
        <EditPost
          id={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  )
}
