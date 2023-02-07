"use client"

import Post from "./Post"
import AddPost from "./AddPost"
import { useQuery } from "react-query"

//Interface
interface User {
  name: string
  image: string
}
interface Comments {
  createdAt: string
  id: string
  postId: string
  title: string
  userId: string
}
interface PostsType {
  title: string
  id: string
  createdAt?: string
  comments?: Comments[]
  user: User
}

//Fetch All posts
const fetchPosts = async (): Promise<PostsType[]> => {
  const res = await fetch("/api/posts/getPosts")
  return res.json()
}

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: fetchPosts,
    queryKey: ["posts"],
  })
  if (error) return error
  if (isLoading) return "Loading....."

  return (
    <div>
      <AddPost />
      {data?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  )
}
