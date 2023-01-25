"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"

export default function AddComment({ id }) {
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [commentError, setCommentError] = useState("")

  const queryClient = useQueryClient()
  const mutation = useMutation((data) => {
    return fetch("/api/posts/addComment", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
  })

  const submitPost = async (e) => {
    e.preventDefault()
    setIsDisabled(true)
    //Check comment
    if (!title) {
      setCommentError("This field cannot be left empty")
      setTitle("")
      setIsDisabled(false)
      return
    }
    if (title.length > 300) {
      setCommentError("Make sure your post is not more that 300 characters")
      setIsDisabled(false)
      return
    }
    mutation.mutate(
      { title, postId: id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["getDetails"])
          setTitle("")
          setIsDisabled(false)
        },
      }
    )
  }
  return (
    <form onSubmit={submitPost} className="my-8">
      <h3 className="text-xl">Add a comment</h3>

      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className=" bg-cyan-700 text-white py-2 px-6 disabled:opacity-25"
          type="submit"
        >
          Add Comment 🚀
        </button>
        <p
          className={`font-bold  ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >{`${title.length}/300`}</p>
      </div>

      {commentError && <h2 className="text-red-700 mt-4">{commentError}</h2>}
    </form>
  )
}
