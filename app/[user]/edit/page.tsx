"use client"

import Image from "next/image"
import {
  Instagram,
  Twitter,
  Youtube,
  GripVertical,
  Pencil,
  Trash,
} from "lucide-react"
import { Tiktok } from "@/icons/Tiktok"
import useUser from "@/hooks/useUser"
import { useState } from "react"
import UserInfos from "./user-infos"

const socials = [
  {
    id: "instagram",
    text: "jhon_espinosa01",
    link: "",
    icon: Instagram,
  },
  {
    id: "twitter",
    text: "jhon_espi",
    link: "",
    icon: Twitter,
  },
  {
    id: "tiktok",
    text: "espinosaaaa",
    link: "",
    icon: Tiktok,
  },
  {
    id: "youtube",
    text: "Jhon Espinosa",
    link: "",
    icon: Youtube,
  },
]

/*
check if user has sign-in or not
get all admin user data from db
render it

add handleSave
add handleDelete
*/

export default function Home() {
  const user = useUser()
  console.log((user))





  return (
    <main className="w-11/12 max-w-md mx-auto min-h-screen flex items-center justify-center py-16">
      <section className="bg-white rounded-xl p-8 w-full shadow-lg">
        <UserInfos user={user}/>
        <p className="mb-4 mt-6">Social Medias</p>
        <div className="flex flex-col gap-3 mb-3">
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <div key={social.id} className="flex items-center gap-2">
                <button type="button" className="cursor-grab">
                  <GripVertical className="text-zinc-600" />
                </button>
                <button
                  type="button"
                  className="border border-zinc-200 rounded-lg px-6 py-3 hover:bg-zinc-100 flex items-center gap-4 basis-full"
                >
                  <Icon className="text-zinc-400" />
                  {social.text}
                </button>
                <button
                  type="button"
                  className="border border-zinc-200 rounded-lg hover:bg-zinc-100 p-3"
                >
                  <Pencil className="text-zinc-400" />
                </button>
                <button
                  type="button"
                  className="border border-zinc-200 rounded-lg hover:bg-zinc-100 p-3"
                >
                  <Trash className="text-zinc-400" />
                </button>
              </div>
            )
          })}
        </div>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg px-6 py-3 w-full"
        >
          Add new social link
        </button>
      </section>
    </main>
  )
}
