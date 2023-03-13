"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "../assets/logo.png";

const links = [
  {
    name: "Commands",
    href: "/commands"
  },
  {
    name: "Invite",
    href: "https://discord.com/api/oauth2/authorize?client_id=1001168331996409856&permissions=1101927804016&scope=bot"
  },
  {
    name: "Support",
    href: "https://discord.com/invite/8DZQcpxnbB"
  },
  {
    name: "GitHub",
    href: "https://github.com/HenrySpartGlobal/InHouseQueue"
  },
  {
    name: "Documentation",
    href: "https://docs.inhousequeue.xyz"
  },
]

export default function Navbar({
  background,
  absolute
}: {
  background?: boolean
  absolute?: boolean
}) {
  // state to keep track of if the mobile menu is open
  const [open, setOpen] = useState(false);

  return (
    <div className={
      (absolute ? 'absolute top-0 left-0 z-50' : '') + ' w-full'
    }>
      <div className={`flex flex-row items-center justify-between w-full px-4 py-4 ${
        background ? 'bg-background-main' : ''
      }`}>
        {/* logo */}
        <div className="flex flex-row items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white">
            <Image height={32} src={Logo} alt="In-House Queue" />
          </div>
          <h1 className="text-xl font-bold text-white">
            <Link href="/">
              In-House Queue
            </Link>
          </h1>
        </div>

        {/* links */}
        <div className="flex-row items-center gap-4 hidden sm:flex">
          {
            links.map((link, index) => (
              link.href.startsWith("http") ? (
                <a key={index} className="text-gray-400 hover:text-white" href={link.href}>
                  {link.name}
                </a>
              ) : (
                <Link key={index} href={link.href} className="text-gray-400 hover:text-white">
                  {link.name}
                </Link>
              )
            ))
          }
        </div>

        {/* mobile menu */}
        <div className="flex flex-row items-center gap-4 sm:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" 
            className={
              "h-6 w-6 text-white transition-all " + (
                open ? ' transform rotate-90' : ''
              )
            }
            viewBox="0 0 20 20" 
            fill="currentColor"
            onClick={() => setOpen(!open)}
          >
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* dropdown for mobile */}
      {
        open && (
          <div className="relative">
            <div className="absolute flex flex-col items-center justify-center w-full p-4 bg-background-main backdrop-blur-lg bg-opacity-60 z-50">
              <div className="flex flex-col items-center justify-center w-full gap-4">
                {/* add home */}
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>

                {
                  links.map((link, index) => (
                    link.href.startsWith("http") ? (
                      <a key={index} className="text-gray-400 hover:text-white" href={link.href}>
                        {link.name}
                      </a>
                    ) : (
                      <Link key={index} href={link.href} className="text-gray-400 hover:text-white">
                        {link.name}
                      </Link>
                    )
                  ))
                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}