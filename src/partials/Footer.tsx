import Link from "next/link";

export default function Footer(props: { withBorder?: boolean }) {
  return (
    <footer className="px-8">
      { props.withBorder && <hr className="border-t-background-accent border-t-2" /> }

      {/* 3 cols grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-gray-400">

          {/* col 1 - info */}
          <div>
            <h3 className="text-lg font-bold">In-House Queue</h3>
            <p className="mt-2 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>

          {/* col 2 - links*/}
          <div>
            <h3 className="text-lg font-bold">Resources</h3>
            <ul className="mt-4 space-y-4 content">
              <li>
                <a href="https://discord.com/invite/8DZQcpxnbB">
                  Support
                </a>
              </li>
              <li>
                <Link href="/commands">
                  Commands
                </Link>
              </li>
              <li>
                <a href="https://discord.com/oauth2/authorize?client_id=1001168331996409856&permissions=3489918032&scope=bot">
                  Invite
                </a>
              </li>
              <li>
                <a href="https://github.com/HenrySpartGlobal/InHouseQueue">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* col 3 - more links */}
          <div>
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="mt-4 space-y-4 content">
              <li>
                <Link href="/terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}