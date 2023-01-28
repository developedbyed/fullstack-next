"use client"
import { AiFillHeart } from "react-icons/ai"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useMutation } from "react-query"
import axios from "axios"
import { useQueryClient } from "react-query"
import { useState } from "react"

export default function Post({
  id,
  name,
  avatar,
  postTitle,
  comments,
  hearts,
}) {
  //Create a post
  const queryClient = useQueryClient()
  const [liked, setLiked] = useState(false)
  const { mutate } = useMutation(
    async () =>
      await axios.post("/api/posts/addLike", {
        postId: id,
      }),
    {
      onError: (error) => {
        console.log(error)
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries("posts")
        queryClient.invalidateQueries("getDetails")
        if (data.status === 201) setLiked(true)
        if (data.status === 200) setLiked(false)
      },
    }
  )

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
      className="bg-white my-8 p-8 rounded-lg "
    >
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8 ">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link
          href={{
            pathname: `/post/${id}`,
          }}
        >
          <p className=" text-sm font-bold text-gray-700">
            {comments.length} Comments
          </p>
        </Link>
        <p
          onClick={() => mutate()}
          className={`text-sm font-bold  flex items-center gap-1 ${
            liked ? "text-red-700" : "text-gray-700"
          }`}
        >
          {hearts.length}
          <AiFillHeart className="text-2xl " />
        </p>
      </div>
    </motion.div>
  )
}
