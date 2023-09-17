export function Footer() {
  return (
    <>
      <div className="my-4 w-full max-w-3xl border-t border-gray-200 dark:border-gray-800" />
      <footer className="flex flex-col justify-between py-5 md:flex-row">
        <ul className="flex">
          <li className="mr-6">
            <a
              href="
                https://twitter.com/adarshaacharya"
              target="_blank"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Twitter
            </a>
          </li>
          <li className="mr-6">
            <a
              href="
                https://twitter.com/adarshaacharya"
              target="_blank"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Instagram
            </a>
          </li>
          <li className="mr-6">
            <a
              href="
                https://twitter.com/adarshaacharya"
              target="_blank"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Facebook
            </a>
          </li>
          <li className="mr-6">
            <a
              href="
                https://twitter.com/adarshaacharya"
              target="_blank"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Linkedin
            </a>
          </li>
        </ul>
        <p>
          © {new Date().getFullYear()} Aadarsha Acharya. All rights reserved.
        </p>
      </footer>
    </>
  );
}
