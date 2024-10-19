import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-darkbg text-white dark:text-gray-200 p-4 mt-10 ">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Flowbite. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Created by
          <Link
            to="https://github.com/Hema471"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300 dark:hover:text-gray-400 ml-2"
          >
            <span>Ibrahim Ismail</span>
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
