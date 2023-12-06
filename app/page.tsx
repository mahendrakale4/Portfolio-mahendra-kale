import Link from "next/link"
import React from "react"
import Particles from "./components/particles"

const navigation = [
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
]

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-10  font-medium text-4xl ">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              // className="text-3xl duration-500 text-zinc-500 hover:text-zinc-300 "
              className="text-3xl  text-zinc-500 hover:text-zinc-300 ">
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="z-10 text-3xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-7xl whitespace-nowrap bg-clip-text ">
        Mahendra
      </h1>
      {/* <h1 className="z-10 text-2xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-6xl whitespace-nowrap bg-clip-text ">
        Kale
      </h1> */}

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className=" mx-1 text-sm text-zinc-500 ">
          {""} Hello, I&apos;m Mahendra, and I&apos;m on a journey to develop
          web apps, services, and infrastructure.
          <br />
          {/* <Link
            target="_blank"
            href="https://linktr.ee/mahendrakale"
            className="underline duration-500 hover:text-zinc-300"
          >
            Resume 
          </Link> */}
        </h2>
      </div>
    </div>
  )
}
