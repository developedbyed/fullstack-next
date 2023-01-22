export const dynamic = "force-dynamic"

import prisma from "../prisma/client"
import Post from "./Post"
import AddPost from "./AddPost"

export default async function Home() {
  const data = await prisma.post.findMany({
    include: {
      user: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div>
      <AddPost />
      {data.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          comments={post.comments}
          likes={post.likes}
        />
      ))}
    </div>
  )
}
