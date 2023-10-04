"use client"

import { Pencil } from "lucide-react"
import Image from "next/image"
import { db, auth, storage } from "../firebase"
import { useRouter } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { getDownloadURL, ref } from "firebase/storage"
import { onAuthStateChanged } from "firebase/auth"


export default function Home() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "user", user!.uid)
          const docSnap = await getDoc(docRef)
          let obj = docSnap.data()

          // get profile image
          const imageRef = ref(storage, `${obj!.image}`)
          const url = await getDownloadURL(imageRef)
          obj = { ...obj, image: url }
          setCurrentUser(obj)
        } catch (error: any) {
          console.log(error.message)
        }
      } else {
        router.push("/sign-in")
      }
    })
  }

  if (!currentUser) return 

  return (
    <main className="w-11/12 max-w-md mx-auto min-h-screen flex items-center justify-center">
      <section className="bg-white rounded-xl p-8 w-full shadow-lg">
        <div className="relative w-[114px] h-[114px] rounded-full overflow-hidden ring ring-violet-600 ring-offset-4 mx-auto mb-4">
          {currentUser?.image && (
            <Image
              src={currentUser.image}
              alt="man"
              className="w-full h-full object-cover"
              width={114}
              height={114}
            />
          )}
        </div>
        <h1 className="text-xl font-extrabold tracking-tight mb-8 text-center">
          Hello, {currentUser?.firstName} {currentUser?.lastName}!
        </h1>
        <button onClick={() => console.log(auth.currentUser)}>
          check auth
        </button>
        <p className="mb-1 text-zinc-600">Your social link</p>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={`linkleap.com/${currentUser?.username}`}
            className="border border-zinc-200 rounded-lg py-2 px-4 min-w-0 w-full"
            readOnly
          />
          <button className="bg-blue-600 hover:bg-blue-600 rounded-lg px-4 py-2 text-white">
            Copy
          </button>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 justify-center border border-zinc-200 px-6 py-3 rounded-lg hover:bg-zinc-100 w-full"
        >
          <Pencil className="text-zinc-400" />
          Edit Profile
        </button>
      </section>
    </main>
  )
}
