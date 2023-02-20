"use client";

import { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import type { Command } from "../data/commands";

export default function Command(props: { command: Command, key: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // update the content height when the content is expanded
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded]);

  // update contentHeight on resize
  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full p-8 bg-background-accent rounded-md">
      {/* top part that is shown by default */}
      <div 
        className="flex flex-row gap-4 align-middle cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* icon */}
        <div className="fill-white my-auto h-fit w-fit">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              fill-rule="evenodd" 
              clip-rule="evenodd" 
              d="M3.11111 0C1.39289 0 0 1.39289 0 3.11111V24.8889C0 26.6072 1.39289 28 3.11111 28H24.8889C26.6072 28 28 26.6072 28 24.8889V3.11111C28 1.39289 26.6072 0 24.8889 0H3.11111ZM21.6214 8.42207L19.4216 6.22219L6.22222 19.4216L8.4221 21.6214L21.6214 8.42207Z" 
              fill="#fff" 
            /> 
          </svg>
        </div>

        {/* command name */}
        <p className="flex-grow">
          <strong className="text-white">
            {props.command.name} -{" "}
          </strong>
          <span className="text-gray-400">
            {props.command.description}
          </span>
        </p>

        {/* expand/collapse button */}
        <div className="h-full text-white">
          <FaAngleDown 
            className={`transition-transform transform duration-1000 ${isExpanded ? "rotate-180" : ""}`}
            size={24}
          />
        </div>
      </div>

      {/* bottom part that is hidden by default */}
      {/* on click, transition by having it slide down */}
      <div
        className={`transition-all duration-1000 overflow-hidden`}
        ref={contentRef}
        style={{
          maxHeight: isExpanded ? contentHeight : 0
        }}
      >
        {/* two part grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-4 text-sm">
          {/* usage */}
          <div>
            <p className="text-gray-400">
              Usage:
            </p>
            <p className="text-white whitespace-pre-wrap">
              {props.command.usage.join('\n')}
            </p>
          </div>

          {/* examples */}
          <div>
            <p className="text-gray-400">
              Examples:
            </p>
            <p className="text-white whitespace-pre-wrap">
              {props.command.examples.join('\n')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}