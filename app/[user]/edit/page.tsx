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

export default function Home() {
  return (
    <main className="w-11/12 max-w-md mx-auto min-h-screen flex items-center justify-center py-16">
      <section className="bg-white rounded-xl p-8 w-full shadow-lg">
        <div className="flex items-start justify-between mb-2">
          <div className="relative w-[96px] h-[96px] rounded-full overflow-hidden ring ring-violet-600 ring-offset-4 mb-4">
            <Image
              src="/man.jpg"
              alt="man"
              className="w-full h-full object-cover"
              width={96}
              height={96}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Accent</p>
            <div className="w-[35px] h-[35px] bg-violet-600 rounded-full"></div>
          </div>
        </div>
        <button
          type="button"
          className="border border-zinc-200 rounded-lg px-4 py-2 hover:bg-zinc-100 mb-3"
        >
          Upload new image
        </button>

        <div className="mb-3 flex flex-col gap-1">
          <label htmlFor="">Edit name</label>
          <input
            type="text"
            value={"Jhon Espinosa"}
            className="border border-zinc-200 rounded-lg px-4 py-2"
          />
        </div>
        <div className="mb-3 flex flex-col gap-1">
          <label htmlFor="">Edit Bio</label>
          <input
            type="text"
            value={"This is my bio! have fun!"}
            className="border border-zinc-200 rounded-lg px-4 py-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-zinc-200 rounded-lg px-4 py-2 hover:bg-zinc-100">
            Delete my account
          </button>
          <button className="bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700 text-white">
            Save
          </button>
        </div>
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
