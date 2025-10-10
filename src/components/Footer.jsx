import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content border-t border-gray-600 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <nav className="flex flex-wrap justify-center gap-3 text-sm sm:text-base">
          <a href="/privacy-policy" className="link link-hover">
            Privacy Policy
          </a>
          <a href="/terms-and-conditions" className="link link-hover">
            Terms
          </a>
          <a href="/refund-policy" className="link link-hover">
            Refund
          </a>
          <a href="/shipping-policy" className="link link-hover">
            Shipping
          </a>
          <a href="/contact-us" className="link link-hover">
            Contact
          </a>
        </nav>

        <p className="text-xs sm:text-sm text-center">
          © {new Date().getFullYear()} DevTinder | Built by{" "}
          <a
            href="https://linkedin.com/in/saddam-hussein786"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Saddam
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
