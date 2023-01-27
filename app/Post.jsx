"use client"
import { AiFillHeart } from "react-icons/ai"
import Image from "next/image"
import Link from "next/link"

export default function Post({ id, name, avatar, postTitle, comments, likes }) {
  return (
    <div className="bg-white my-8 p-8 rounded-lg ">
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
      <div className="flex gap-4 cursor-pointer">
        <Link
          href={{
            pathname: `/post/${id}`,
          }}
        >
          <p className=" text-sm font-bold text-gray-700">
            {comments.length} Comments
          </p>
        </Link>
      </div>
    </div>
  )
}
