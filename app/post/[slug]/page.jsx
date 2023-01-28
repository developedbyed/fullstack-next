"use client"

import Post from "../../Post"
import AddComment from "../../AddComment"
import Image from "next/image"
import { useQuery } from "react-query"
import axios from "axios"

export default function PostDetail({ params }) {
  const { slug } = params
  const { data, error, isLoading } = useQuery(
    "getDetails",
    async () => await axios.get(`/api/posts/${slug}`)
  )
  if (isLoading) return "Loading"
  return (
    <div>
      <Post
        id={data.data.id}
        name={data.data.user.name}
        avatar={data.data.user.image}
        likes={data.data.likes}
        np
        postTitle={data.data.title}
        comments={data.data.comments}
      />
      <AddComment id={data.data.id} />
      {data.data.comments.map((comment) => (
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
