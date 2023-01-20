"use client"

import Image from "next/image"
import { signOut } from "next-auth/react"

export default function Logged({ image }) {
  console.log(image)
  return (
    <li className="flex gap-8">
      <button onClick={() => signOut()}>Sign Out</button>
      <Image
        width={64}
        height={64}
        className="w-12 rounded-full"
        src={image}
        alt=""
      />
    </li>
  )
}
