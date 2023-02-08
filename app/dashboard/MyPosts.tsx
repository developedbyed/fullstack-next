"use client"

import EditPost from "./EditPost"
import { useQuery } from "react-query"
import axios from "axios"
import { AuthPosts } from "../types/AuthPosts"

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts")
  return response.data
}

export default function MyPosts(): JSX.Element {
  const { data, isLoading } = useQuery<AuthPosts>(
    "getAuthPosts",
    fetchAuthPosts
  )
  if (isLoading) return <h1>Posts are loading...</h1>
  if (data) console.log(data)
  return (
    <div>
      {data?.posts?.map((post) => (
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
