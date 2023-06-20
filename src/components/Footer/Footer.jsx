import React from "react";
import "./footer.css";

const Footer = () => {
  const authorName = "Nicolás Cruz";

  return (
    <footer className="footercontainer">
      <p>&copy; 2023 {authorName}. Todos los derechos reservados.</p>
      <div className="footerLinks">
        <a
          href="https://www.linkedin.com/in/nicofj-cruz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://www.github.com/NicoFJCruz"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
