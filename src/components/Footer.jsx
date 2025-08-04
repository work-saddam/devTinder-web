const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 fixed bottom-0">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          <a href="https://linkedin.com/in/saddam-hussein786">
            {" "}
            Saddam Hussein
          </a>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
