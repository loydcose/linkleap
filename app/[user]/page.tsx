import Image from "next/image"
import { Instagram, Twitter, Youtube } from "lucide-react"
import { Tiktok } from "../../icons/Tiktok"

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
    <main className="w-11/12 max-w-md mx-auto min-h-screen flex items-center justify-center">
      <section className="bg-white rounded-xl p-8 w-full shadow-lg">
        <div className="relative w-[137px] h-[137px] rounded-full overflow-hidden ring ring-violet-600 ring-offset-4 mx-auto mb-4">
          <Image
            src="/man.jpg"
            alt="man"
            className="w-full h-full object-cover"
            width={137}
            height={137}
          />
        </div>
        <h1 className="text-xl font-extrabold tracking-tight mb-1 text-center">
          Hello, Jhon Espinosa!
        </h1>
        <p className="mb-10 text-zinc-600 text-center">
          Hi! this is my bio, have fun! ⭐
        </p>

        <div className="flex flex-col gap-4">
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <button
                key={social.id}
                type="button"
                className="border border-zinc-200 rounded-lg px-6 py-3 hover:bg-zinc-100 flex items-center gap-4"
              >
                <Icon className="text-zinc-400" />
                {social.text}
              </button>
            )
          })}
        </div>
      </section>
    </main>
  )
}
