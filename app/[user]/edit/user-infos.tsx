"use client"

import { db } from "@/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import Image from "next/image"

import { ReactNode, useEffect, useState } from "react"

export default function UserInfos({ user }: { user: any }) {
  const [updateUser, setUpdateUser] = useState({...user})
  const [hasModified, setHasModified] = useState(false)
  // console.log(user)

  useEffect(() => {
    if (user && updateUser) {
      const isModified = !Object.keys(user).every(
        (key) => user[key] === updateUser[key]
      )
      setHasModified(isModified)
    }
  }, [updateUser, user])

  const updateText = (e: any) => {
    setUpdateUser((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const inputs = [
    {
      title: "Username",
      id: "username",
      defaultValue: user?.username,
      value: updateUser?.username,
      onChange: (e: any) => updateText(e),
    },
    {
      title: "First Name",
      id: "firstName",
      defaultValue: user?.firstName,
      value: updateUser?.firstName,
      onChange: (e: any) => updateText(e),
    },
    {
      title: "Last Name",
      id: "lastName",
      defaultValue: user?.lastName,
      value: updateUser?.lastName,
      onChange: (e: any) => updateText(e),
    },
    {
      title: "Bio",
      id: "bio",
      defaultValue: user?.bio,
      value: updateUser?.bio,
      onChange: (e: any) => updateText(e),
    },
  ]

  const handleSave = async () => {
    try {
      const res = await setDoc(doc(db, "user", user.uid), {...user, ...updateUser})
      console.log({ res })

      alert("User information updated successfully!")
    } catch (error: any) {
      console.log(`Failed to update user info: ${error.message}`)
    }
  }
  return (
    <>
      <div className="flex items-start justify-between mb-2">
        <div
          style={{ borderColor: user?.accent || "#2563EB" }}
          className="relative w-[96px] h-[96px] rounded-full overflow-hidden ring ring-offset-4 mb-4"
        >
          <Image
            src={user?.image}
            alt="man"
            className="w-full h-full object-cover"
            width={96}
            height={96}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Accent</p>
          <div
            style={{ backgroundColor: user?.accent || "#2563EB" }}
            className="w-[35px] h-[35px] rounded-full"
          ></div>
        </div>
      </div>
      <button
        type="button"
        className="border border-zinc-200 rounded-lg px-4 py-2 hover:bg-zinc-100 mb-3"
      >
        Upload new image
      </button>
      {inputs.map((input) => {
        const { title, ...rest } = input

        return (
          <div key={input.id} className="mb-3 flex flex-col gap-1">
            <label htmlFor="">Edit {title}</label>
            <input
              name={input.id}
              {...rest}
              type="text"
              className="border border-zinc-200 rounded-lg px-4 py-2"
            />
          </div>
        )
      })}
      <div className="flex items-center gap-2">
        <button className="border border-zinc-200 rounded-lg px-4 py-2 hover:bg-zinc-100">
          Delete my account
        </button>
        <button
          onClick={handleSave}
          disabled={!hasModified}
          className="bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700 text-white disabled:bg-zinc-300 disabled:text-zinc-500 transition-all"
        >
          Save
        </button>
      </div>
    </>
  )
}
