import prisma from "../../../prisma/client"
import Post from "../../Post"
import AddComment from "../../AddComment"
import Image from "next/image"

//Enable for production
export async function generateStaticParams() {
  const posts = await prisma.post.findMany()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export const dynamic = "force-dynamic"

export default async function PostDetail({ params }) {
  const data = await prisma.post.findUnique({
    where: {
      id: params?.slug,
    },
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
  })

  return (
    <div>
      <Post
        id={data.id}
        name={data.user.name}
        avatar={data.user.image}
        likes={data.likes}
        postTitle={data.title}
        comments={data.comments}
      />
      <AddComment id={data.id} />
      {data.comments.map((comment) => (
        <div className="my-6" key={comment.id}>
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={comment.user.image}
              alt="avatar"
            />
            <h3>{comment.user.name}</h3>
          </div>
          <div className="py-4">{comment.title}</div>
        </div>
      ))}
    </div>
  )
}
