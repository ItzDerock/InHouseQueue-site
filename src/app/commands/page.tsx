"use client";

import { startTransition, useMemo, useState } from "react";
import Button from "../../components/Button";
import commands from "../../data/commands";
import Navbar from "../../partials/Navbar";
import { IoMdSearch } from "react-icons/io";
import Command from "../../components/Command";

type Categories = (typeof commands)[number]["type"] | "All";

// the description for each category
const categoryDescriptions = {
  All: "All Commands",
  Admin: "You must have Administrator or Manage Channels permissions to run these commands",
  "Set-Up": "Set up your server to use InHouseQueue Bot!",
  General: "General commands that all members can use.",
  Premium: "Premium only commands",
//   Overwatch: "Overwatch commands",
//   Valorant: "Valorant commands",
} satisfies {
  [key in Categories]: string;
};

export default function Commands() {
  // keep track of keywords and filter category
  const [filterKeywords, setFilterKeywords] = useState("");
  const [filterCategory, setFilterCategory] = useState("All" as Categories);

  // compute the filtered commands
  const filteredCmds = useMemo(
    () =>
      commands.filter((command) => {
        // needs to match category
        if (filterCategory !== "All" && command.type !== filterCategory)
          return false;

        // needs to match keywords
        if (filterKeywords !== "") {
          console.log(
            "filtering: ",
            command.name,
            command.description,
            filterKeywords
          );

          // check if the command name contains the keywords
          if (command.name.toLowerCase().includes(filterKeywords.toLowerCase()))
            return true;

          // check if the description contains the keywords
          if (
            command.description
              .toLowerCase()
              .includes(filterKeywords.toLowerCase())
          )
            return true;
        } else {
          // if no keywords, return true
          return true;
        }

        // if no match, return false
        return false;
      }),
    [filterCategory, filterKeywords]
  );

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* content */}
      <div className="m-4 max-w-5xl lg:m-auto">
        {/* title */}
        <h1 className="text-center text-4xl font-bold text-white">
          In-House Queue Commands
        </h1>

        {/* description */}
        <p className="pt-1 text-center text-gray-400">
          Here are all the available commands for InHouseQueue! If you&apos;re
          new here, check out the Set-Up search button!
        </p>
        <p className="pt-1 text-center text-gray-400">
          Please visit our{" "}
          <a href="https://docs.inhousequeue.xyz/docs/">
            {" "}
            <strong>
              {" "}
              <u>Documentation</u>{" "}
            </strong>{" "}
          </a>{" "}
          for in-depth details on commands
        </p>

        {/* search */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for command"
            className="my-7 w-full rounded-md border border-gray-600 bg-background-main p-2 text-white"
            // update keywords
            onChange={(e) => {
              // wrap in startTransition to prevent lag
              startTransition(() => setFilterKeywords(e.target.value));
            }}
          />

          {/* search icon */}
          <div className="absolute top-1/2 right-2 -translate-y-1/2 transform text-primary">
            <IoMdSearch />
          </div>
        </div>

        {/* filter buttons */}
        <div className="flex flex-wrap gap-2">
          {Object.keys(categoryDescriptions).map((category) => (
            <Button
              key={category}
              variant={filterCategory === category ? "primary" : "dark"}
              onClick={() => setFilterCategory(category as Categories)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* description */}
        <p className="pt-2 text-white">
          {categoryDescriptions[filterCategory]}
        </p>

        {/* commands */}
        <div className="mt-7 flex flex-col gap-4">
          {filteredCmds.map((command, id) => (
            <Command
              command={command}
              key={`${command.name}-${id}-${command.type}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
