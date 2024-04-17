function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-around md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <div className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023{" "}
        <a
          href="https://www.github.com/rishabh0014"
          className="hover:underline"
          target="__blank"
        >
          Rishabh™
        </a>
        . All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
