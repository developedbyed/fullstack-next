"use client"

import Post from "./Post"
import AddPost from "./AddPost"
import { useQuery } from "react-query"
import { useState } from "react"

const getPosts = async () => {
  const data = await fetch("/api/posts/getPosts")
  const res = await data.json()
  return res
}

export default function Home() {
  const { data, error, isLoading } = useQuery("getPosts", getPosts)
  if (error) return error
  if (isLoading) return "Loading....."
  if (data)
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
        <h1>Posts</h1>
      </div>
    )
}
