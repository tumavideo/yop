import Link from "next/link";

import Flag from "@/assets/images/flag.svg";
import Logo from "@/assets/images/logo.svg";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <img
          id="flag"
          className="d-none d-lg-block"
          src={Flag.src}
          alt="zambia rise logo"
        />
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={Logo.src} alt="zambia rise logo" />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/govt">
                  Govt Programs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/opportunities">
                  Opportunities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/blog">
                  News &amp; Updates
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/testimony">
                  Success Stories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
