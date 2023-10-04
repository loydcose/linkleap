import Image from "next/image"
import { Instagram, Twitter, Youtube } from "lucide-react"
import { Tiktok } from "../../icons/Tiktok"
import { db, auth, storage } from "../../firebase"
import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  query,
  onSnapshot,
  where,
} from "firebase/firestore"
import { notFound } from "next/navigation"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import Link from "next/link"

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

export default async function Home({
  params: { user },
}: {
  params: { user: string }
}) {
  let foundUser: any = null

  try {
    const q = query(collection(db, "user"), where("username", "==", user))
    const documentSnapshots = await getDocs(q)
    console.log(documentSnapshots.docs[0].data())

    if (documentSnapshots.docs.length === 0) {
      throw Error("Not found!")
    } else {
      let doc = documentSnapshots.docs[0].data()
      // get profile picture
      const userProfileRef = ref(storage, `${doc.image}`)
      const userProfileUrl = await getDownloadURL(userProfileRef)
      // get media icons
      const newMedias = doc?.medias ? await Promise.all(
        doc.medias.map(async (media: any) => {
          const imageRef = ref(storage, `${media.icon}`)
          const url = await getDownloadURL(imageRef)
          return { ...media, icon: url }
        })
      ) : []
      foundUser = { ...doc, medias: newMedias, image: userProfileUrl }
    }
  } catch (error) {
    console.error(error)
    notFound()
  }

  return (
    <main className="w-11/12 max-w-md mx-auto min-h-screen flex items-center justify-center">
      <section className="bg-white rounded-xl p-8 w-full shadow-lg">
        <div className="relative w-[137px] h-[137px] rounded-full overflow-hidden ring ring-violet-600 ring-offset-4 mx-auto mb-4">
          <Image
            src={foundUser.image}
            alt="man"
            className="w-full h-full object-cover"
            width={137}
            height={137}
          />
        </div>
        <h1 className="text-xl font-extrabold tracking-tight mb-1 text-center">
          Hello, {foundUser.firstName} {foundUser.lastName}!
        </h1>

        {foundUser?.bio && (
          <p className="mb-10 text-zinc-600 text-center">{foundUser.bio}</p>
        )}

        <div className="flex flex-col gap-4">
          {foundUser.medias.map((media: any) => {
            return (
              <Link
                href={media.link}
                key={media.name}
                className="border border-zinc-200 rounded-lg px-6 py-3 hover:bg-zinc-100 flex items-center gap-4"
              >
                <object
                  data={media.icon}
                  type="image/svg+xml"
                  className="text-4xl"
                >
                  Your browser does not support SVG
                </object>
                {media.displayText}
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
