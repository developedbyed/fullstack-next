"use client"

import EditPost from "./EditPost"
import { useQuery } from "react-query"
import { Toaster } from "react-hot-toast"

export default function MyPosts() {
  const getAuthPosts = async () => {
    const data = await fetch("/api/posts/authPosts")
    const res = await data.json()
    return res
  }
  const { data, error, isLoading } = useQuery("getAuthPosts", getAuthPosts)
  if (error) return error
  if (isLoading) return "Loading....."
  if (data)
    return (
      <div>
        {data.posts.map((post) => (
          <EditPost
            id={post.id}
            key={post.id}
            avatar={data.image}
            name={data.name}
            title={post.title}
            comments={post.comments}
          />
        ))}
      </div>
    )
}
