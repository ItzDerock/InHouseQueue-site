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
              hello@inhousequeue.xyz
            </p>
            <p className="mt-2 text-sm">
              © 2025 All rights reserved.
            </p>
          </div>
          {/* col 2 - links*/}
          <div>
            <h3 className="text-lg font-bold">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/commands">
                  Commands
                </Link>
              </li>
              <li>
                <a href="https://discord.com/api/oauth2/authorize?client_id=1001168331996409856&permissions=2433051696&scope=bot">
                  Invite
                </a>
              </li>
              <li>
                <a href="https://discord.gg/rT9cZD3tkA">
                  Support
                </a>
              </li>
              <li>
                <a href="https://www.paypal.com/donate/?hosted_button_id=RU4GLAWSP6TJC">
                  Donate
                </a>
              </li>
              <li>
              <a href="https://docs.inhousequeue.xyz/">
                Documentation
              </a>
             </li>
            </ul>
          </div>

          {/* col 3 - more links */}
          <div>
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="mt-4 space-y-4">
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