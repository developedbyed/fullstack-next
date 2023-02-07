"use client"

import Post from "../../Post"
import AddComment from "../../AddComment"
import Image from "next/image"
import { useQuery } from "react-query"

//Fetch All posts
const fetchDetails = async (slug: string) => {
  const res = await fetch(`/api/posts/${slug}`)
  return res.json()
}

export default function PostDetail({ params }) {
  const { slug } = params
  const { data, isLoading } = useQuery({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(slug),
  })
  if (isLoading) return "Loading"

  return (
    <div>
      <Post
        id={data?.id}
        name={data?.user.name}
        avatar={data?.user.image}
        postTitle={data?.title}
        comments={data?.comments}
      />
      <AddComment id={data?.id} />
      {data?.comments?.map((comment) => (
        <div className="my-6 bg-white p-8 rounded-md" key={comment.id}>
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={comment.user?.image}
              alt="avatar"
            />
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="py-4">{comment.title}</div>
        </div>
      ))}
    </div>
  )
}
