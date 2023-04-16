"use client";

import { startTransition, useMemo, useState } from "react";
import Button from "../../components/Button";
import commands from "../../data/commands";
import Navbar from "../../partials/Navbar";
import { IoMdSearch } from "react-icons/io";
import Command from "../../components/Command";
import Footer from "../../partials/Footer";

type Categories = (typeof commands[number])["type"] | "All";

// the description for each category
const categoryDescriptions = {
  "All": "All Commands",
  "Admin": "You must have Administrator permissions to run these commands",
  "Set-Up": "Set up your server to use InHouseQueue Bot!",
  "General": "General commands that all members can use.",
} satisfies {
  [key in Categories]: string;
}

export default function Commands() {
  // keep track of keywords and filter category
  const [filterKeywords, setFilterKeywords] = useState("");
  const [filterCategory, setFilterCategory] = useState("All" as Categories);
  
  // compute the filtered commands
  const filteredCmds = useMemo(() => commands.filter((command) => {
    // needs to match category
    if (filterCategory !== "All" && command.type !== filterCategory) return false;

    // needs to match keywords
    if (filterKeywords !== "") {
      console.log("filtering: ", command.name, command.description, filterKeywords)

      // check if the command name contains the keywords
      if (command.name.toLowerCase().includes(filterKeywords.toLowerCase())) return true;

      // check if the description contains the keywords
      if (command.description.toLowerCase().includes(filterKeywords.toLowerCase())) return true;
    } else {
      // if no keywords, return true
      return true;
    }

    // if no match, return false
    return false;
  }), [filterCategory, filterKeywords]);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* content */}
      <div className="max-w-5xl m-4 lg:m-auto">
        {/* title */}
        <h1 className="text-4xl font-bold text-center text-white">In-House Queue Commands</h1>

        {/* description */}
        <p className="text-center text-gray-400 pt-1">
          Here are all the available commands for InHouseQueue! If you&apos;re new here, check out the Set-Up search button!
        </p>
        <p className="text-center text-gray-400 pt-1">
           Please visit our <a href="https://docs.inhousequeue.xyz/docs/">  <strong> <u>Documentation</u> </strong> </a> for in-depth details on commands
        </p>

        {/* search */}
        <div className="relative w-full">
          <input 
            type="text" 
            placeholder="Search for command"
            className="my-7 w-full rounded-md border-gray-600 text-white bg-background-main border p-2"

            // update keywords
            onChange={(e) => {
              // wrap in startTransition to prevent lag
              startTransition(() => setFilterKeywords(e.target.value))
            }}
          />

          {/* search icon */}
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-primary">
            <IoMdSearch />
          </div>
        </div>

        {/* filter buttons */}
        <div className="flex flex-wrap gap-2">
          {
            Object.keys(categoryDescriptions).map((category) => (
              <Button
                key={category}
                variant={filterCategory === category ? "primary" : "dark"}
                onClick={() => setFilterCategory(category as Categories)}
              >
                {category}
              </Button>
            ))
          }
        </div>

        {/* description */}
        <p className="text-white pt-2">
          {categoryDescriptions[filterCategory]}
        </p>

        {/* commands */}
        <div className="flex flex-col gap-4 mt-7">
          {
            filteredCmds.map((command) => (
              <Command 
                command={command}
                key={command.name}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}