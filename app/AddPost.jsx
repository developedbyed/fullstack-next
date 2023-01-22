"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [postError, setPostError] = useState("")

  const router = useRouter()

  const submitPost = async (e) => {
    e.preventDefault()
    setIsDisabled(true)
    //Check post
    if (!title) {
      setPostError("This field cannot be left empty")
      setTitle("")
      setIsDisabled(false)
      return
    }
    if (title.length > 300) {
      setPostError("Make sure your post is not more that 300 characters")
      setIsDisabled(false)
      return
    }
    try {
      const post = await fetch("/api/posts/addPost", {
        method: "POST",
        body: JSON.stringify({ title }),
      })
      if (!post.ok) {
        const result = await post.json()
        setPostError(result.message)
      }
      return result
    } catch (error) {}

    setTitle("")
    setIsDisabled(false)
    // router.refresh()
  }
  return (
    <form onSubmit={submitPost} className="bg-gray-200 my-8 ">
      <div className="flex flex-col my-4">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          placeholder="What's on your mind?"
          className="p-4 text-lg rounded-md my-2 "
        />
      </div>
      <div className=" flex items-center gap-2">
        <button
          disabled={isDisabled}
          className=" bg-cyan-700 text-white py-2 px-6 disabled:opacity-25"
          type="submit"
        >
          Create post 🚀
        </button>
        <p
          className={`font-bold  ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >{`${title.length}/300`}</p>
      </div>
      {postError && <h2 className="text-red-700 mt-4">{postError}</h2>}
    </form>
  )
}
