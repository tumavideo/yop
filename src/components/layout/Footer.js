import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-3 my-auto">
            <img src="assets/images/footer-logo.svg" alt="zambia rise logo" />
          </div>

          <div className="col-md-3">
            <h1>Quick Link</h1>
            <ul className="list-unstyled">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/job">Opportunities</Link>
              </li>
              <li>
                <Link href="/blog">News &amp; Update</Link>
              </li>
              <li>
                <Link href="/testimony">Success Stories</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h1>Social Link</h1>
            <ul className="list-unstyled">
              <li>
                <Link
                  href="https://www.facebook.com/profile.php?id=100091630395011"
                  target="_blank"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com/zambiarise" target="_blank">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="https://instagram.com/zambiarise" target="_blank">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="https://youtube.com/zambiarise" target="_blank">
                  YouTube
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h1>Contact Info</h1>
            <ul className="list-unstyled">
              <li>
                <Link href="mailto:support@zambiarise.com">
                  Email: support@zambiarise.com
                </Link>
              </li>
              <li>
                <Link href="tel:+260977971685">Cell: +260 977 971 685</Link>
              </li>
              <li>
                <Link href="tel:+260978070847">Or Cell: +260 978 070 847</Link>
              </li>
            </ul>
          </div>
        </div>
        <p>All Rights Reserved 2023. Zambia Rise.</p>
      </div>
    </footer>
  );
};

export default Footer;
