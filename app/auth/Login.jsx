"use client"

import { signIn } from "next-auth/react"

export default function Login() {
  return (
    <li>
      <button onClick={() => signIn()}>Sign In</button>
    </li>
  )
}
