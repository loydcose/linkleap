"use client"

import Image from "next/image"
import { auth, googleProvider, db } from "../../firebase"
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { useRouter } from "next/navigation"
import { doc, getDoc, setDoc } from "firebase/firestore"

const socials = [
  {
    id: "google",
    text: "Sign in with Google",
    link: "",
    icon: "/google.png",
  },
  {
    id: "facebook",
    text: "Sign in with Facebook",
    link: "",
    icon: "/facebook.png",
  },
]

export default function SignIn() {
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider)
      const user = userCredential.user

      const usersRef = doc(db, "user", user.uid)
      const userDoc = await getDoc(usersRef)

      if (!userDoc.exists()) {
        let userData: any = {
          uid: user.uid,
          firstName: user.displayName ? user.displayName.split(" ")[0] : "",
          lastName: user.displayName ? user.displayName.split(" ")[1] : "",
          accent: "#000000",
          bio: "",
          image: "/user/clapping-pepe.gif"
        }
        await setDoc(usersRef, userData)
      }

      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogOut = async () => {
    try {
      await signOut(auth)
      alert("Logged out")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="w-11/12 max-w-md mx-auto min-h-screen flex items-center justify-center">
      <section className="bg-white rounded-xl p-8 w-full shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-tighter text-center mb-2">
          Welcome to <span className="text-violet-600">Linkleap</span>
        </h1>
        <p className="mb-6 text-zinc-500 text-center">
          Login below, and start sharing your link to everyone!
        </p>
        <div className="flex flex-col gap-3">
          {socials.map((social) => (
            <button
              onClick={handleGoogleSignIn}
              type="button"
              key={social.id}
              className="flex items-center gap-3 border border-zinc-200 rounded-2xl hover:bg-zinc-100 py-3 px-6 text-zinc-600"
            >
              <Image src={social.icon} alt={social.id} width={25} height={25} />
              {social.text}
            </button>
          ))}
          <button onClick={handleLogOut}>logout</button>
        </div>
      </section>
    </main>
  )
}
