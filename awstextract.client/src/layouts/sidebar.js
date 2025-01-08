"use client";

import { useState } from "react";
import Link from "next/link";

import clsx from "clsx";

export default function Sidebar({ responseData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      {/* Sidebar */}
      <div
        className={clsx(
          "sticky inset-y-0 start-0 z-[60] bg-blue-600 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:bg-neutral-800 dark:border-neutral-700",
          isExpanded ? "w-64" : "w-16",
          "h-full transition-all duration-300"
        )}
        role="dialog"
        aria-label="Sidebar"
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-4 text-gray-300 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Content */}
        <nav
          className="hs-accordion-group p-2 w-full flex flex-col flex-wrap overflow-hidden"
          data-hs-accordion-always-open
        >
          <ul className="flex flex-col space-y-1">
            <li>
              <Link
                href="/"
                className={clsx(
                  "flex items-center  h-10 gap-x-3.5 py-2 px-2.5 bg-white/10 text-sm text-white rounded-md hover:bg-white/10 focus:outline-none focus:bg-white/10 dark:bg-neutral-700 dark:text-white"
                )}
                title="Dashboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-house-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
                </svg>
                <span className={clsx(isExpanded ? "visible" : "invisible")}>
                  Dashboard
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        {/* End Content */}
      </div>
      {/* End Sidebar */}
    </>
  );
}
