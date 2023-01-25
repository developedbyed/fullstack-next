"use client"

import Post from "../../Post"
import AddComment from "../../AddComment"
import Image from "next/image"
import { useQuery } from "react-query"

const getDetails = async (slug) => {
  const data = await fetch(`/api/posts/${slug}`)
  const res = await data.json()
  return res
}

export default function PostDetail({ params }) {
  const { slug } = params
  const { data, error, isLoading } = useQuery("getDetails", () =>
    getDetails(slug)
  )

  if (isLoading) return "Loading"
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
