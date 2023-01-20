"use client"

import { signOut } from "next-auth/react"

export default function Logged({ image }) {
  console.log(image)
  return (
    <li className="flex gap-8">
      <button onClick={() => signOut()}>Sign Out</button>
      <img className="w-16 rounded-full" src={image} alt="" />
    </li>
  )
}
