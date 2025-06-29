import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import "../styles/icons.css";
export default function SocialIcons() {
  return (
    <div className="social-icons">
      <Link href="/">
        <FaFacebookF />
      </Link>
      <Link href="/">
        <FaTwitter />
      </Link>
      <Link href="/">
        <FaInstagram />
      </Link>
      <Link href="/">
        <FaLinkedinIn />
      </Link>
      <Link href="/">
        <FaYoutube />
      </Link>
    </div>
  );
}
