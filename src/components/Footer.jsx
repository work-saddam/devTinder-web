const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal border-t border-gray-600 footer-center bg-base-300 text-base-content p-4 ">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by{" "}
          <a href="https://linkedin.com/in/saddam-hussein786" target="_blank">
            Saddam
          </a>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
