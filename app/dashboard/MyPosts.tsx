"use client"

import EditPost from "./EditPost"
import { useQuery } from "react-query"

interface UserProp {
  email: string
  id: string
  image: string
  name: string
  posts?: Posts[]
}
interface Posts {
  createdAt: string
  id: string
  title: string
  comments?: Comments[]
}
interface Comments {
  createdAt: string
  id: string
  postId: string
  title: string
  userId: string
}

export default function MyPosts(): JSX.Element {
  const getAuthPosts = async (): Promise<UserProp> => {
    const data = await fetch("/api/posts/authPosts")
    const res = await data.json()
    return res
  }
  const { data, isLoading } = useQuery("getAuthPosts", getAuthPosts)
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
