import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-24">
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaYoutube />
            </a>
            <a>
              <FaTwitter />
            </a>
            <a>
              <FaFacebookF />
            </a>
          </div>
        </nav>
        <aside>
          <p>
            Copyright © 2024 - All right reserved by #Foodify and{" "}
            <Link to={"https://www.github.com/abdullahmiraz"}>
              <span className="underline">Miraz</span>
            </Link>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
