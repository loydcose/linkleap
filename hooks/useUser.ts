import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"
import { auth, db, storage } from "@/firebase"
import { doc, getDoc } from "firebase/firestore"
import { getDownloadURL, ref } from "firebase/storage"
export default function useUser() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const docRef = doc(db, "user", currentUser!.uid)
          const docSnap = await getDoc(docRef)
          let obj = docSnap.data()

          // get profile image
          const imageRef = ref(storage, `${obj!.image}`)
          const url = await getDownloadURL(imageRef)
          obj = { ...obj, image: url }
          setUser(obj)
        } catch (error: any) {
          console.log(error.message)
        }
      } else {
        router.push("/sign-in")
      }
    })
  }

  return user
}
