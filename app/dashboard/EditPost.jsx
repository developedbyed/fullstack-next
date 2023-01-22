"use client"

import Image from "next/image"
import { useState } from "react"
import Toggle from "./Toggle"
import { useRouter } from "next/navigation"

export default function EditPost({ avatar, name, title, comments, id }) {
  const [toggle, setToggle] = useState(false)
  const router = useRouter()

  const deletePost = async () => {
    console.log("deleteee")
    try {
      const post = await fetch("/api/posts/deletePost", {
        method: "DELETE",
        body: JSON.stringify({ postId: id }),
      })
      if (!post.ok) {
        const result = await post.json()
        console.log(result)
      }
      console.log(result)
    } catch (error) {}
    router.refresh()
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        setToggle(false)
      }}
      className="bg-white my-8 p-8 rounded-lg "
    >
      <div className="flex items-center gap-2">
        <Image width={32} height={32} src={avatar} alt="avatar" />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8 ">
        <p className="break-all">{title}</p>
      </div>
      <div className="flex items-center gap-4 cursor-pointer">
        <p className=" text-sm font-bold text-gray-700">
          {comments.length} Comments
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setToggle(true)
          }}
          className="text-sm font-bold text-red-500"
        >
          Delete
        </button>
        {toggle && <Toggle deletePost={deletePost} />}
      </div>
    </div>
  )
}
