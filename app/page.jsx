"use client"

import Post from "./Post"
import AddPost from "./AddPost"
import { useQuery } from "react-query"
import axios from "axios"
import { AnimatePresence } from "framer-motion"

export default function Home() {
  const { data, error, isLoading } = useQuery(
    "posts",
    async () => await axios.get("/api/posts/getPosts")
  )
  if (error) return error
  if (isLoading) return "Loading....."
  if (data.data) console.log(data.data)
  return (
    <div>
      <AddPost />
      {data.data.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          comments={post.comments}
          hearts={post.hearts}
        />
      ))}
    </div>
  )
}
