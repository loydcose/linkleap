import Image from "next/image"

const socials = [
  {
    id: "google",
    text: "Sign up with Google",
    link: "",
    icon: "/google.png",
  },
  {
    id: "facebook",
    text: "Sign up with Facebook",
    link: "",
    icon: "/facebook.png",
  },
]

export default function Home() {
  return (
    <main className="w-11/12 max-w-md mx-auto min-h-screen flex items-center justify-center">
      <section className="bg-white rounded-xl p-8 w-full shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-tighter text-center mb-2">
          Welcome to <span className="text-violet-600">Linkleap</span>
        </h1>
        <p className="mb-6 text-zinc-500 text-center">
          Signup below, and start sharing your link to everyone!
        </p>
        <div className="flex flex-col gap-3">
          {socials.map((social) => (
            <button
              type="button"
              key={social.id}
              className="flex items-center gap-3 border border-zinc-200 rounded-2xl hover:bg-zinc-100 py-3 px-6 text-zinc-600"
            >
              <Image src={social.icon} alt={social.id} width={25} height={25} />
              {social.text}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
